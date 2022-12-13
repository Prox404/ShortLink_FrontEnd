import classNames from "classnames/bind";

import styles from "./Link.module.scss";
import CreateLinkForm from "~/components/CreateLinkForm";
import UserListLink from "~/components/UserListLink/UserListLink";
import AuthMiddleware from "~/middlewares/AuthMiddleware";

const cx = classNames.bind(styles);

function Link() {

    AuthMiddleware();

    console.log("re-render");
    

    return (<>
        <div className={cx('wrapper')}>
            <div className="row">
                <div className="col-12 col-xl-6">
                    <CreateLinkForm />
                </div>
                <div className="col-12 col-xl-6">
                    <UserListLink />
                </div>
            </div>
        </div>
    </>);
}

export default Link;