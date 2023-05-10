import classNames from "classnames/bind";
import { FaLink, FaUser, FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";

import styles from "./Home.module.scss";
import * as LinkServices from "~/services/LinkServices";
import AuthMiddleware from "~/middlewares/AuthMiddleware";
import { UserListLink } from "~/components/UserListLink";
import Footer from "~/layouts/Components/Footer/Footer";

let cx = classNames.bind(styles);

function Home() {
    AuthMiddleware();
    const [overview, setOverview] = useState({});

    useEffect(() => {
        const getOverview = async () => {
            const res = await LinkServices.overview();
            setOverview(res.data);
        }
        getOverview();
    }, [])

    return (<>
        {overview && (<>
            <div className={`row`}>
                <div className={`col-12 col-md-4 ${cx('overview-wrapper')}`}>
                    <div className={`card fade-up ${cx('overview-container')}`}>
                        <div className={`${cx('red')} ${cx('icon-wrapper')}`}>
                            <FaLink />
                        </div>
                        <div className={cx('title-wrapper')}>
                            <p className={cx('overview-title')}>
                                Toàn bộ URL
                            </p>
                            <p className={cx('overview-value')}>
                                {overview.numberLinks}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={`col-12 col-md-4 ${cx('overview-wrapper')}`}>
                    <div className={`card fade-up ${cx('overview-container')}`}>
                        <div className={`${cx('green')} ${cx('icon-wrapper')}`}>
                            <FaUsers />
                        </div>
                        <div className={cx('title-wrapper')}>
                            <p className={cx('overview-title')}>
                                Thành viên
                            </p>
                            <p className={cx('overview-value')}>
                                {overview.numberUser}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={`col-12 col-md-4 ${cx('overview-wrapper')}`}>
                    <div className={`card fade-up ${cx('overview-container')}`}>
                        <div className={`${cx('blue')} ${cx('icon-wrapper')}`}>
                            <FaUser />
                        </div>
                        <div className={cx('title-wrapper')}>
                            <p className={cx('overview-title')}>
                                URL của bạn
                            </p>
                            <p className={cx('overview-value')}>
                                {overview.numberLinkOfUser}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="col-12 mt-4">
                    <UserListLink hasAction isNotRight="true"/>
                </div>

                <Footer/>
            </div>
        </>)}
    </>);
}

export default Home;