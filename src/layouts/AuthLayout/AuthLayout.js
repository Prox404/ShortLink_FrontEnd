import classNames from "classnames/bind";

import Carousel from "~/components/Carousel";
import styles from "./AuthLayout.module.scss";

const cx = classNames.bind(styles);

function AuthLayout({children}) {
    return (<div className={cx('wrapper')}>
        <div className="row">
            <div className={`col-12 col-lg-6 fade-up ${cx('left-container')}`}>
                {children}
            </div>
            <div className={`col-12 col-lg-6 fade-down ${cx('right-container')}`}>
                <div>
                    <Carousel />
                </div>
            </div>
        </div>
    </div>);
}

export default AuthLayout;