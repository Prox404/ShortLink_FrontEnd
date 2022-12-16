import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import * as LinkServices from "~/services/LinkServices";
import useModal from "~/hooks/useModal";
import Modal from "~/components/Modal/Modal";
import styles from "./GetLink.module.scss";

const cx = classNames.bind(styles);

function GetLink() {
    const params = useParams();
    console.log("render");

    const [links, setLinks] = useState({});
    const [password, setPassword] = useState('');

    const id = params.id;

    useEffect(() => {
        console.log("call");
        const get = async () => {
            const res = await LinkServices.getLink(id);
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
        <div className={` card ${cx('get-link-container')}`}>
            {
                (Object.getOwnPropertyNames(links).length > 0 && <>
                    {
                        links.password === 'false' || links.password === password ? (<>
                            <p className={cx('main-title')}>
                                Prox ShortURL
                            </p>

                            <p className={cx('sub-title')}>
                                Đây là liên kết của bạn
                            </p>
                            <center>
                                <a href={links.link} className="btn btn-primary">Đến trang đích</a>
                                <br />
                                <button className="btn btn-blue mt-3" onClick={toggle}>Quét Mã QR</button>
                                <Modal
                                    isShowing={isShowing}
                                    hide={toggle}
                                >
                                    <center>
                                        <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${links.link}&size=150x150`} alt="QRCode" />
                                    <p className="mt-3">Mã QR siêu cấp vjp pro</p>
                                    </center>
                                </Modal>
                            </center>
                        </>) : (
                            <>
                                <p className={cx('main-title')}>
                                    Prox ShortURL
                                </p>

                                <p className={cx('sub-title')}>
                                    Vui lòng nhập mật khẩu để tiếp tục
                                </p>
                                <center>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control input-sm mb-3" placeholder="Mật khẩu" />
                                    <button onClick={handleSubmit} className="btn btn-primary">Tiếp tục</button>
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
                            Đường dẫn không tồn tại hoặc đã bị xóa ☹️
                        </p>
                        <center>
                            <Link to="/" className="btn btn-primary">Trở về trang chủ</Link>
                        </center>

                    </>
                )
            }

        </div>
    </div>);
}

export default GetLink;