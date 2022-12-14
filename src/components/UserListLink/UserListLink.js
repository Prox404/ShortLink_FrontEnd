import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames/bind";
import { BsFillCaretRightFill, BsFillCaretLeftFill } from "react-icons/bs";

import styles from "./UserListLink.module.scss";
import * as LinkServices from "~/services/LinkServices";
import Table from "~/components/Table";

const cx = classNames.bind(styles);

function UserListLink({ isNotRight = false }) {

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
                    delete link._id;
                    delete link.__v;
                    delete link.password;
                    delete link.user_id;
                    delete link.updatedAt;

                    setLinks(res.data);
                });
            }
        };
        fetchLinks();
    }, [currentPage]);

    const head = [
        {
            title: "Host",
            sortable: true,
            valueOf: "link",
        },
        {
            title: "R??t g???n",
            sortable: false,
            valueOf: "short_link",
        },
        {
            title: "Ng??y t???o",
            sortable: true,
            valueOf: "createdAt",
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
            <h1 className="mb-4 ms-4">Danh s??ch li??n k???t</h1>
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