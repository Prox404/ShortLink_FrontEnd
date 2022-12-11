import classNames from "classnames/bind";
import {useState} from 'react';
import { toast } from 'react-toastify';

import  * as UserServices from "~/services/UserServices";
import Carousel from "~/components/Carousel";
import styles from "./Login.module.scss";

const cx = classNames.bind(styles);

function Login() {

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
            // setTimeout(() => {
            //     window.location.href = '/';
            // }, 3000)
        }
        return ;
    }

    return (<div className={cx('wrapper')}>
        <div className="row">
            <div className={`col-12 col-lg-6 ${cx('left-container')}`}>
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
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Login</button>
            </div>
            <div className={`col-12 col-lg-6 ${cx('right-container')}`}>
                <div>
                    <Carousel />
                </div>
            </div>
        </div>
    </div>);
}

export default Login;