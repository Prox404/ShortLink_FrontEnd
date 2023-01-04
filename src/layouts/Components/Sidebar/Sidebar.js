import Tippy from '@tippyjs/react';
import classNames from "classnames/bind";
import 'tippy.js/dist/tippy.css';

import { RiDashboardFill } from "react-icons/ri";
import { FaLink } from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import { AiFillBook } from "react-icons/ai";

import SidebarItem from "~/components/SidebarItem"
import styles from "./Sidebar.module.scss";
import Menu from "~/components/Popper/Menu";

const cx = classNames.bind(styles);
const content = [
    {
        title: "Dashboard",
        to: "/",
        icon: <RiDashboardFill />,
    },
    {
        title: "Link",
        to: "/links",
        icon: <FaLink />,
    },
    {
        title: "Contact",
        to: "/contact",
        icon: <AiFillBook />,
    },
    {
        title: "About",
        to: "/about",
        icon: <MdInfo />,
    }
]

const MENU_ITEMS = [
    {
        icon: <svg width="1em" height="1em" className={cx('left-icon')} viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M20.3019 6.38068C21.723 6.08373 22.9615 7.16986 23.009 8.50693C23.2751 16.0034 29.4377 22 37 22C37.8141 22 38.6105 21.9307 39.3839 21.7982C40.7019 21.5723 42 22.5655 42 24C42 33.9411 33.9411 42 24 42C14.0589 42 6 33.9411 6 24C6 15.3248 12.1351 8.0871 20.3019 6.38068ZM19.2223 10.8358C13.8426 12.7885 10 17.9473 10 24C10 31.732 16.268 38 24 38C31.06 38 36.8994 32.7742 37.8611 25.9797C37.5756 25.9932 37.2886 26 37 26C28.0237 26 20.5827 19.4301 19.2223 10.8358Z"></path></svg>,
        title: 'Chế độ tối',
        theme: true,
    },
];

const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const userMenu = [
    {
        icon: <svg width="1em" height="1em" className={cx('left-icon')} viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M24.0003 7C20.1343 7 17.0003 10.134 17.0003 14C17.0003 17.866 20.1343 21 24.0003 21C27.8663 21 31.0003 17.866 31.0003 14C31.0003 10.134 27.8663 7 24.0003 7ZM13.0003 14C13.0003 7.92487 17.9252 3 24.0003 3C30.0755 3 35.0003 7.92487 35.0003 14C35.0003 20.0751 30.0755 25 24.0003 25C17.9252 25 13.0003 20.0751 13.0003 14ZM24.0003 33C18.0615 33 13.0493 36.9841 11.4972 42.4262C11.3457 42.9573 10.8217 43.3088 10.2804 43.1989L8.32038 42.8011C7.77914 42.6912 7.4266 42.1618 7.5683 41.628C9.49821 34.358 16.1215 29 24.0003 29C31.8792 29 38.5025 34.358 40.4324 41.628C40.5741 42.1618 40.2215 42.6912 39.6803 42.8011L37.7203 43.1989C37.179 43.3088 36.6549 42.9573 36.5035 42.4262C34.9514 36.9841 29.9391 33 24.0003 33Z"></path></svg>,
        title: 'View profile',
        to: `/profile/${currentUser ? currentUser.username : ''}`,
    },
    ...MENU_ITEMS,
    {
        icon: <svg width="1em" height="1em" className={cx('left-icon')} viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M24.1716 26L7 26C6.44771 26 6 25.5523 6 25L6 23C6 22.4477 6.44771 22 7 22L24.1716 22L20.2929 18.1213C19.9024 17.7308 19.9024 17.0976 20.2929 16.7071L21.7071 15.2929C22.0976 14.9024 22.7308 14.9024 23.1213 15.2929L30.4142 22.5858C31.1953 23.3668 31.1953 24.6332 30.4142 25.4142L23.1213 32.7071C22.7308 33.0976 22.0976 33.0976 21.7071 32.7071L20.2929 31.2929C19.9024 30.9024 19.9024 30.2692 20.2929 29.8787L24.1716 26ZM36 43L27 43C26.4477 43 26 42.5523 26 42L26 40C26 39.4477 26.4477 39 27 39L36 39C37.1046 39 38 38.1046 38 37L38 11C38 9.89543 37.1046 9 36 9L27 9C26.4477 9 26 8.55228 26 8L26 6C26 5.44771 26.4477 5 27 5L36 5C39.3137 5 42 7.68629 42 11L42 37C42 40.3137 39.3137 43 36 43Z"></path></svg>,
        title: 'Log out',
        logout: true,
        separate: true,
    },
];

function Sidebar() {
    const currentUser = JSON.parse(localStorage.getItem("user")) || undefined;
    return <>
        <div className={cx('wrapper')}>
            <div className={cx('logo-wrapper')}>
                <img className={cx('logo')} src="https://i.ibb.co/176z8y8/Prox-logo-white.png" alt="logo" />
            </div>
            <div className={cx('sidebar-item-wrapper')}>
                {
                    content.map((item, index) => {
                        return (
                            <Tippy key={index + 1} className={cx('placement')} content={item.title} placement="right">
                                <SidebarItem key={index} {...item} />
                            </Tippy>
                        )
                    })
                }
            </div>

            <Menu className={cx('menu')} items={currentUser ? userMenu : MENU_ITEMS}>
                {currentUser && (<div className={cx('profile-wrapper')}>
                    <div className={cx('profile-image-wrapper')}>
                        <img className={cx('profile-img')} src={currentUser.avatar || "https://i.ibb.co/176z8y8/Prox-logo-white.png"} alt="profile" />
                    </div>
                    <div className={cx('profile-info')}>
                        <span className={cx('profile-name')}>{currentUser.username || "Ehee"}</span>
                    </div>
                </div>)}
            </Menu>
        </div>
    </>;
}

export default Sidebar;