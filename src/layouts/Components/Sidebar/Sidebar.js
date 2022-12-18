import classNames from "classnames/bind";
import { useNavigate } from 'react-router-dom';

import { RiDashboardFill } from "react-icons/ri";
import { FaLink } from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import { AiFillBook } from "react-icons/ai";

import SidebarItem from "~/components/SidebarItem"
import styles from "./Sidebar.module.scss";

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

function Sidebar() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }
    return <>
        <div className={cx('wrapper')}>
            <div className={cx('logo-wrapper')}>
                <img className={cx('logo')} src="https://i.ibb.co/kMkJydd/Prox-logo.png" alt="logo" />
            </div>
            <div className={cx('sidebar-item-wrapper')}>
                {
                    content.map((item, index) => {
                        return <SidebarItem key={index} {...item} />
                    })
                }
            </div>


            <div className={cx('profile-wrapper')}>
                <SidebarItem
                    title="Log out"
                    onClick={logout}
                    icon={<MdInfo />}
                />
            </div>
        </div>

    </>;
}

export default Sidebar;