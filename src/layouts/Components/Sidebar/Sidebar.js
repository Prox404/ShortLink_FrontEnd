import classNames from "classnames/bind";
import { RiDashboardFill } from "react-icons/ri";
import { FaLink } from "react-icons/fa";
import {  MdInfo } from "react-icons/md";
import {  AiFillBook } from "react-icons/ai";

import SidebarItem from "~/components/SidebarItem"
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);
const content = [
    {
        title: "Dashboard",
        to: "/",
        icon: <RiDashboardFill/>,   
    },
    {
        title: "Link",
        to: "/news",
        icon: <FaLink/>,
    },
    {
        title: "Contact",
        to: "/contact",
        icon: <AiFillBook/>,
    },
    {
        title: "About",
        to: "/about",
        icon: <MdInfo/>,
    }
]

function Sidebar() {

    return <>
        <div className={cx('wrapper')}>
            {
                content.map((item, index) => {
                    return <SidebarItem key={index} {...item} />
                })
            }
        </div>

    </>;
}

export default Sidebar;