import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames/bind";

import Images from "~/assets/images";
import styles from "./Carousel.scss";

let cx = classNames.bind(styles);

function Carousel({ ...props }) {
    var settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        lazyLoad: true,
        arrows: false,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <Slider className={cx('wrapper')} {...settings}>
            <div className="banner-wrapper">
                <div className={cx('banner')}>
                    <img src={Images.ppt1} alt="patten 1" />
                </div>
                <h3 className="text-center">
                    Free Shortener Link
                </h3>
            </div>
            <div className="banner-wrapper">
                <div className={cx('banner')}>
                    <img src={Images.ppt2} alt="patten 1" />
                </div>
                <h3 className="text-center">
                    Quick & Secure Shortener Link
                </h3>
            </div>
            <div className="banner-wrapper">
                <div className={cx('banner')}>
                    <img src={Images.ppt3} alt="patten 1" />
                </div>
                <h3 className="text-center">
                    No ADS
                </h3>
            </div>
        </Slider>
    );
}

export default Carousel;