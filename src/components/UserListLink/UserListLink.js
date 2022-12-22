import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";

import styles from "./UserListLink.module.scss";
import * as LinkServices from "~/services/LinkServices";

const cx = classNames.bind(styles);

function UserListLink() {

    const [links, setLinks] = useState([]);

    useEffect(() => {
        const fetchLinks = async () => {
            const res = await LinkServices.getUserLink();
            if (res) {
                setLinks(res.data);
            }
        };
        fetchLinks();
    }, []);

    function timeSince(date) {
        date = new Date(date);

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

    return <>
        <div className="card ps-0 pe-0 pb-0 responsive-card fade-up">
            <h1 className="mb-4 ms-4">Danh sách liên kết</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Link</th>
                        <th>Short Link</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        links.length > 0 ? links.map((link, index) => {
                            let link_regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/igm;
                            let link_match = link_regex.exec(link.link);
                            link.link = link_match[1];

                            return <tr key={index}>
                                <td>{link.link}</td>
                                <td>{link.short_link}</td>
                                <td>{timeSince(link.createdAt)}</td>
                            </tr>
                        }) : <tr>
                            <td colSpan="3">No data</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>

    </>;
}

export default UserListLink;