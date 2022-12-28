import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./About.module.scss";
import images from "~/assets/images";

const cx = classNames.bind(styles);
function About() {
    return (<>
        <div className="row">
            <div className={`col-12 col-md-6 ${cx('left-wrapper')} fade-left`}>
                <p className={cx('sub-title')}>Hello !</p>
                <p className={cx('main-title')}>Welcome to <span className={cx('primary-title')}>ShortLink</span></p>
                <p className={cx('description')}>ShortLink is a free URL shortening service that allows you to create short links, which apart from being free, you get detailed statistics of the links created.</p>
                <Link to="/contact" className={`mt-3 ${cx('btn btn-primary')}`}>
                    Contact Me
                </Link>
            </div>
            <div className={`col-12 col-md-6 ${cx('right-wrapper')} fade-right`}>
                <img src={images.welcome} alt="about" className={cx('about-img')} />
            </div>
        </div>
    </>);
}

export default About;