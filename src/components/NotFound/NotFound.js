import classNames from "classnames/bind";

import images from "~/assets/images";
import styles from "./NotFound.module.scss";

let cx = classNames.bind(styles);
function NotFound() {
    return (<>
        <div className={cx('wrapper')}>
            <center>
                <img src={images.notFound} alt="not-found" className="img-fluid" />
                <h3 className={`mt-3 ${cx('title')}`}>No data here 👀</h3>
            </center>
        </div>
    </>);
}

export default NotFound;