import classNames from "classnames/bind";

import styles from "./LoadingScreen.module.scss";
import images from "~/assets/images";

const cx = classNames.bind(styles);
function LoadingScreen() {
    return (<>
        <div className={cx('loading-wrapper')}>
            <img src={images.loading} alt="loading" className={cx('loading-spinner')} />
        </div>
    </>);
}

export default LoadingScreen;