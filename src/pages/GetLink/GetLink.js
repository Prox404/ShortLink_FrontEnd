import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import * as LinkServices from "~/services/LinkServices";
import useModal from "~/hooks/useModal";
import Modal from "~/components/Modal/Modal";
import LoadingScreen from "~/components/LoadingScreen";
import styles from "./GetLink.module.scss";

const cx = classNames.bind(styles);

function GetLink() {
    const params = useParams();
    console.log("render");

    const [links, setLinks] = useState({});
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);

    const id = params.id;

    useEffect(() => {
        console.log("call");
        const get = async () => {
            setLoading(true);
            const res = await LinkServices.getLink(id);
            setLoading(false);
            if (res) {
                setLinks(res.data);
            }
        }
        get();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async () => {
        const params = new URLSearchParams();
        params.append('password', password);
        const res = await LinkServices.getLinkHasPassword(id, params);
        if (res) {
            setLinks(res.data);
        }
    }

    const { isShowing, toggle } = useModal();


    return (<div className={cx('wrapper')}>
        {
            loading ? (
                <LoadingScreen />
            ) : (<>
                <div className={` card ${cx('get-link-container')}`}>
                    {
                        (Object.getOwnPropertyNames(links).length > 0 && <>
                            {
                                links.password === 'false' || links.password === password ? (<>
                                    <p className={cx('main-title')}>
                                        Prox ShortURL
                                    </p>

                                    <p className={cx('sub-title')}>
                                        ????y l?? li??n k???t c???a b???n
                                    </p>
                                    <center>
                                        <a href={links.link} className="btn btn-primary">?????n trang ????ch</a>
                                        <br />
                                        <button className="btn btn-danger mt-3" onClick={toggle}>Qu??t M?? QR</button>
                                        <br />
                                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${links.link}`} className="btn btn-blue mt-3">Chia s???</a>
                                        <br />
                                        <Link to={`/links`} className="btn btn-warning mt-3">R??t g???n li??n k???t m???i</Link>
                                        <Modal
                                            isShowing={isShowing}
                                            hide={toggle}
                                        >
                                            <center>
                                                <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${links.link}&size=150x150`} alt="QRCode" />
                                                <p className="mt-3">M?? QR si??u c???p vjp pro</p>
                                            </center>
                                        </Modal>
                                    </center>
                                </>) : (
                                    <>
                                        <p className={cx('main-title')}>
                                            Prox ShortURL
                                        </p>

                                        <p className={cx('sub-title')}>
                                            Vui l??ng nh???p m???t kh???u ????? ti???p t???c
                                        </p>
                                        <center>
                                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control input-sm mb-3" placeholder="M???t kh???u" />
                                            <button onClick={handleSubmit} className="btn btn-primary">Ti???p t???c</button>
                                        </center>

                                    </>
                                )
                            }

                        </>) || (
                            <>
                                <p className={cx('main-title')}>
                                    Oops!
                                </p>

                                <p className={cx('sub-title')}>
                                    ???????ng d???n kh??ng t???n t???i ho???c ???? b??? x??a ??????
                                </p>
                                <center>
                                    <Link to="/" className="btn btn-primary">Tr??? v??? trang ch???</Link>
                                </center>

                            </>
                        )
                    }

                </div>
            </>)
        }

    </div>);
}

export default GetLink;