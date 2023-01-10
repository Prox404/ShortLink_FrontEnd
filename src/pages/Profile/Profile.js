import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as UserServices from "~/services/UserServices";
import styles from "./Profile.module.scss";
import AuthMiddleware from "~/middlewares/AuthMiddleware";
import UserListLink from "~/components/UserListLink/UserListLink";

const cx = classNames.bind(styles);
function Profile() {

    AuthMiddleware();
    const [user, setUser] = useState({});
    const params = useParams();
    const navigate = useNavigate();



    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        let currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        console.log(currentUser);
        if (currentUser && currentUser.username !== params.username) {
            navigate('/');
        }

        console.log('Profile page');
        const fetchProfile = async () => {
            const res = await UserServices.profile();
            if (res) {
                setUser(res.data);
            }
        }
        fetchProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<>
        <div className={cx('wrapper')}>
            {
                user && (
                    <>
                        <div className={cx('background-banner')}/>
                        <div className={cx('avatar-wrapper')}>
                            <img className={cx('avatar')} src={user.avatar} alt="avatar" />
                        </div>
                        <div className={cx('info-wrapper')}>
                            <p className={cx('username')}>{user.username}</p>
                            <div className={`mt-2 ${cx('actions-wrapper')}`}>
                                <button className={`btn ${cx('outline')}`}>Edit</button>
                            </div>
                        </div>
                        <div className={cx('link-wrapper')}>
                            <UserListLink isNotRight hasAction/>
                        </div>
                    </>
                )
            }
        </div>
    </>);
}

export default Profile;

