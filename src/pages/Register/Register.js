import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import * as UserServices from "~/services/UserServices";
import styles from "./Register.module.scss";

const cx = classNames.bind(styles);
function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();

    const validate = () => {
        const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{8,}$/;
        const userName_regex = /^[a-zA-Z0-9]+$/;

        // console.log(email.match(email_regex)[5]);

        if (!email_regex.test(email)) {
            toast.error("Email is not valid");
            return false;
        } else if (email.length === 0) {
            toast.error("Email is required");
            return false;
        } else if (password.length === 0) {
            toast.error("Password is required");
            return false;
        } else if (!password_regex.test(password)) {
            toast.error("Password need to have at least 8 characters, 1 number, 1 upper case letter and 1 special character");
            return false;
        } else if (password !== confirmPassword) {
            toast.error("Password and confirm password not match");
            return false;
        } else if (userName.length === 0) {
            toast.error("User name is required");
            return false;
        } else if (!userName_regex.test(userName)) {
            toast.error("User name is not valid");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (validate()) {
            let params = new URLSearchParams();
            params.append("email", email);
            params.append("password", password);
            params.append("username", userName);

            const res = await UserServices.register(params);
            if (res) {
                toast.success("Register successfully");
                setTimeout(() => {
                    navigate("/login");
                }, 3003);
            } else {
                toast.error("Username or email already exists");
                return;
            }
        }
    }

    return (<>
        <img className={cx('logo')} src="https://i.ibb.co/kMkJydd/Prox-logo.png" alt="logo" />
        <h1 className="mt-5">Welcome to Prox ShortURL</h1>
        <p>Please register to create account.</p>
        <div className="mb-3 mt-5">
            <label htmlFor="exampleInputUserName" className="form-label">User Name</label>
            <input type="email" value={userName} onChange={(e) => setUserName(e.target.value)} className="form-control" id="exampleInputUserName" />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleConfirmInputPassword1" className="form-label">Re-Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" id="exampleConfirmInputPassword1" />
        </div>
        <p>If you already have a account ?, 
            <Link to="/login" className="a-link">
                Login
            </Link>
        </p>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary mt-3">Register</button>
    </>);
}

export default Register;