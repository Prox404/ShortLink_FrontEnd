import classNames from "classnames/bind";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { FacebookWithLogin } from "~/components/FacebookWithLogin";

import IsLoginMiddleware from '~/middlewares/IsLoginMiddleware';
import * as UserServices from "~/services/UserServices";
import styles from "./Login.module.scss";

const cx = classNames.bind(styles);

function Login() {

    IsLoginMiddleware();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        if (!email || !password) {
            toast.error('Please fill all fields');
            return;
        }
        const params = new URLSearchParams();
        params.append('email', email);
        params.append('password', password);
        console.log(params.toString());
        const res = await UserServices.login(params);
        if (res) {
            console.log(res);
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.data));
            toast.success('Login successfully');
            setTimeout(() => {
                window.location.href = '/';
            }, 3000)
        }
        return;
    }

    return (
        <>
            <img className={cx('logo')} src="https://i.ibb.co/kMkJydd/Prox-logo.png" alt="logo" />
            <h1 className="mt-5">Welcome Back</h1>
            <p>Please login to your account.</p>
            <div className="mb-3 mt-5">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
            </div>
            <p>If you don't have an account,
                <Link to="/register" className="a-link">
                    Register
                </Link>
            </p>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary mt-3">Login</button>
            <div className={`${cx('social-login')}`}>
                
                <div className={`${cx('social-login-line')}`}>
                    <hr/>
                    <span className="text">Or</span>
                    <hr/>
                </div>
                <FacebookWithLogin />
            </div>

        </>
    );
}

export default Login;