import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { toast } from 'react-toastify';
import classNames from "classnames/bind";
import { FaFacebookF } from "react-icons/fa";

import * as UserServices from "~/services/UserServices";
import styles from "./FacebookWithLogin.module.scss";

const cx = classNames.bind(styles);

const FacebookWithLogin = () => {
    
    const responseFacebook = async (response) => {
        // console.log("response", response);
        const { id, name, email, picture } = response;
        console.log(id, name, email, picture.data.url);

        const params = new URLSearchParams();
        params.append('id', id);
        params.append('name', name);
        params.append('email', email);
        params.append('picture', picture.data.url);

        const res = await UserServices.facebookAuth(params);

        if (res) {
            console.log(res);
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('user', JSON.stringify(res.data));
            window.location.reload();
            toast.success('Login successfully');
            setTimeout(() => {
                window.location.href = '/';
            }, 3000)
            return;
        }
    }

    // const componentClicked = () => {
    //     console.log('clicked');
    // }

    return (

        <FacebookLogin
            appId={process.env.FACEBOOK_APP_ID || '201329305813967'}
            fields="name,email,picture"
            // onClick={componentClicked}
            callback={responseFacebook}
            render={renderProps => (
                <button onClick={renderProps.onClick} className={`btn ${cx('btn-facebook')}`}>
                    <FaFacebookF className={cx('icon')} />
                    Login with Facebook
                </button>
            )}
        />

    );
}

export default FacebookWithLogin;