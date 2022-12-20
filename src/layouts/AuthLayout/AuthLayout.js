import classNames from "classnames/bind";

import Carousel from "~/components/Carousel";
import styles from "./AuthLayout.module.scss";

const cx = classNames.bind(styles);

function AuthLayout({children}) {
    return (<div className={cx('wrapper')}>
        <div className="row">
            <div className={`col-12 col-lg-6 ${cx('left-container')}`}
                data-aos="fade-right"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-once="false"
                data-aos-anchor-placement="top-center"
            >
                {children}
            </div>
            <div className={`col-12 col-lg-6 ${cx('right-container')}`}>
                <div>
                    <Carousel />
                </div>
            </div>
        </div>
    </div>);
}

export default AuthLayout;