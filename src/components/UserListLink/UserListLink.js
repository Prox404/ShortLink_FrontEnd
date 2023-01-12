import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames/bind";
import { BsFillCaretRightFill, BsFillCaretLeftFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";

import styles from "./UserListLink.module.scss";
import * as LinkServices from "~/services/LinkServices";
import Table from "~/components/Table";

const cx = classNames.bind(styles);

function UserListLink({ 
    isNotRight = false,
    hasAction = false
}) {

    console.log("re-render");

    const [links, setLinks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [page, setPage] = useState(1);

    function timeSince(date) {
        date = new Date(date);
        // console.log(date);

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    const handleDeleteLink = async (short_link) => {
        try {
            const res = await LinkServices.deleteLink(short_link);
            if (res) {
                toast.success(res.message);
                const newLinks = links.filter(link => link.short_link !== short_link);
                setLinks(newLinks);
            }
        } catch (err) {
            toast.error("Có lỗi xảy ra !");
        }
    }

    useEffect(() => {
        const fetchLinks = async () => {
            const res = await LinkServices.getUserLink(currentPage);
            if (res) {
                setPage(res.pages);
                setCurrentPage(res.current);
                res.data.forEach((link, index) => {
                    // eslint-disable-next-line no-useless-escape
                    let link_regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/igm;
                    let link_match = link_regex.exec(link.link);
                    link.link = link_match[1];

                    link.createdAt = timeSince(link.createdAt);
                    
                    delete link.__v;
                    delete link.password;
                    delete link.user_id;
                    delete link.updatedAt;

                    if(hasAction){
                        link.action = <div className="action">
                            <Link to={`/links/edit/${link._id}`} className="btn btn-light"><RiEdit2Line/></Link>
                            <button className="btn btn-danger ms-3" onClick={() => handleDeleteLink(link.short_link)}><RiDeleteBinLine/></button>
                        </div>;
                    }
                    delete link._id;

                    setLinks(res.data);
                });
            }
        };
        fetchLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const head = [
        {
            title: "Rút gọn",
            sortable: false,
            valueOf: "short_link",
        },
        {
            title: "Host",
            sortable: true,
            valueOf: "link",
        },
        {
            title: "Ngày tạo",
            sortable: true,
            valueOf: "createdAt",
        },
        hasAction && {
            title: "Hành động",
            sortable: false,
            valueOf: "action",
        }
    ];

    const onNextPage = useCallback(() => {
        if (currentPage < page) {
            setCurrentPage(currentPage + 1);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const onPrevPage = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }, [currentPage]);

    const onCurrentPage = useCallback((page) => {
        setCurrentPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    return <>
        <div className={`card ps-0 pe-0 pb-0 responsive-card fade-up ${isNotRight ? cx('not-responsive-card') : ''}`}>
            <h1 className="mb-4 ms-4">Danh sách liên kết</h1>
            <Table head={head} body={links} />
            <div className="paginate">

                {
                    currentPage > 1 && (
                        <button className="paginate-item" onClick={()=> onPrevPage}>
                            <BsFillCaretLeftFill />
                        </button>
                    )
                }
                {
                    Array.from(Array(page).keys()).map((item, index) => {
                        console.log((item + 1).toString() === currentPage);
                        return <button key={index} onClick={()=>onCurrentPage(item + 1)} className={cx('paginate-item', { active: currentPage === (item + 1).toString() })}>{item + 1}</button>
                    })
                }
                {
                    currentPage < page && (
                        <button className="paginate-item" onClick={()=> onNextPage}>
                            <BsFillCaretRightFill />
                        </button>
                    )
                }

            </div>
        </div>

    </>;
}

export default UserListLink;