import classNames from "classnames/bind";
import styles from "./Login.module.scss";

const cx = classNames.bind(styles);

function Login() {
    return (<div className={cx('wrapper')}>
        <div className="row">
            <div className={`col-12 col-lg-6 ${cx('left-container')}`}>
                <img className={cx('logo')} src="https://i.ibb.co/kMkJydd/Prox-logo.png" alt="logo" />
                <h1>LOGIN</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            <div className={`col-12 col-lg-6 ${cx('right-container')}`}>
                <h1>Ehee</h1>
            </div>
        </div>
    </div>);
}

export default Login;