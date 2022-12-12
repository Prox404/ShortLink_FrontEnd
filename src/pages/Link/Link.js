import { useState } from "react";
import classNames from "classnames/bind";
import { toast } from "react-toastify";

import styles from "./Link.module.scss";
import * as LinkServices from "~/services/LinkServices";
import AuthMiddleware from "~/middlewares/AuthMiddleware";

const cx = classNames.bind(styles);

function Link() {

    AuthMiddleware();

    console.log("re-render");

    const [link, setLink] = useState("");
    const [password, setPassword] = useState("");
    const [isCustomLink, setIsCustomLink] = useState(false);
    const [customLink, setCustomLink] = useState("");

    const handleIsCustomLinkChange = (e) => {
        setIsCustomLink(e.target.checked);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append('link', link);
        params.append('short_link', customLink);
        params.append('password', password);
        const res = await LinkServices.store(params);
        if(res){
            toast.success("Link created successfully");
            setLink("");
            setPassword("");
            setIsCustomLink(false);
        }
    }

    return (<>
        <div className={cx('wrapper')}>
            <div className="row">
                <div className="col-12 col-xl-6">
                    <div className="card"
                        data-aos="fade-up"
                        data-aos-duration="500"
                        data-aos-easing="ease-in-out"
                        data-aos-once="false"
                        data-aos-anchor-placement="top-center"
                    >
                        <h1 className={cx('title')}>Rút gọn liên kết</h1>
                        <div className="form">
                            <div className="form-group">
                                <label className="form-label" htmlFor="link">URL</label>
                                <input id="link" onChange={(e) => setLink(e.target.value)} type="text" className="form-control" value={link} />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="password">Mật khẩu</label>
                                <input id="password" onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" value={password} />
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" onClick={(e) => handleIsCustomLinkChange(e)} type="checkbox" defaultValue={isCustomLink} id="isCustomLink" />
                                <label className="form-check-label" htmlFor="isCustomLink">
                                    Tạo liên kết tùy chỉnh
                                </label>
                            </div>
                            {
                                isCustomLink && (
                                    <div className="form-group">
                                        <input id="customLink" value={customLink} onChange={(e) => setCustomLink(e.target.value)} type="text" className="form-control" />
                                    </div>
                                )
                            }

                            <div className="form-footer">
                                <button onClick={handleSubmit} className="btn btn-primary me-2">Rút gọn</button>
                                <button className="btn btn-light me-2">Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-xl-6"></div>
            </div>
        </div>
    </>);
}

export default Link;