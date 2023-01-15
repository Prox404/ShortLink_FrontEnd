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

    const getHost = (url) => {
        // eslint-disable-next-line no-useless-escape
        let link_regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/igm;
        let link_match = link_regex.exec(url);
        return link_match[1];
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
                                        Đây là liên kết của bạn
                                    </p>
                                    <center>
                                        <table className={`horizontal-table mb-3`}>
                                            <tbody>

                                                <tr>
                                                    <td>Rút gọn</td>
                                                    <td>{links.short_link}</td>
                                                </tr>
                                                <tr>
                                                    <td>Đích</td>
                                                    <td>
                                                        {
                                                            getHost(links.link)
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Mật khẩu</td>
                                                    <td>
                                                        {
                                                            links.password === 'false' ? 'Không' : links.password
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <a href={links.link} className="btn btn-primary">Đến trang đích</a>
                                        <br />
                                        <button className="btn btn-danger mt-3" onClick={toggle}>Quét Mã QR</button>
                                        <br />
                                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${links.link}`} className="btn btn-blue mt-3">Chia sẻ</a>
                                        <br />
                                        <Link to={`/links`} className="btn btn-warning mt-3">Rút gọn liên kết mới</Link>
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
            </>)
        }

    </div>);
}

export default GetLink;