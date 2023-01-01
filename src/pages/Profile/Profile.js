import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Profile.module.scss";
import AuthMiddleware from "~/middlewares/AuthMiddleware";

const cx = classNames.bind(styles);
function Profile() {

    AuthMiddleware();
    const params = useParams();
    const navigate = useNavigate();
    let currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    
    if (currentUser && currentUser.username !== params.username) {
        navigate('/');
        return null;
    }

    return ( <>
        <div className={cx('wrapper')}>

        </div>
    </> );
}

export default Profile;