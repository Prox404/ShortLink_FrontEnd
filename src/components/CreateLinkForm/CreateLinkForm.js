import { useState } from "react";
import { toast } from "react-toastify";
import classNames from "classnames/bind";

import * as LinkServices from "~/services/LinkServices";
import styles from "./CreateLinkForm.module.scss";

const cx = classNames.bind(styles);

function CreateLinkForm() {

    const [link, setLink] = useState("");
    const [password, setPassword] = useState("");
    const [isCustomLink, setIsCustomLink] = useState(false);
    const [currentLink, setCurrentLink] = useState([]);
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
        if (res) {
            toast.success("Link created successfully");
            setLink("");
            setPassword("");
            console.log(res);

            // currentLink.push(res.links);
            setCurrentLink([...currentLink, res.link]);
            setIsCustomLink(false);
        }
    }

    const handleCopy = (shortLink) => {
        navigator.clipboard.writeText("https://pr0x.me/" + shortLink).then(function () {
            toast.success("Copied to clipboard");
            return;
        });
        
    }

    return (
        <>
            <div className="card fade-up">
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

            {
                currentLink.length > 0 && (
                    currentLink.map((link, index) => {
                        console.log(link.short_link);
                        return (
                            <div key={index} className="card mt-4">
                                <h3 className="mb-3">Thành công !</h3>
                                <div className="input-group">
                                    <span className="input-group-text form-control" >https://pr0x.me/{link.short_link}</span>
                                    <button className="btn btn-primary" onClick={() => handleCopy(link.short_link)}>
                                        Sao chép
                                    </button>
                                    <a href={`https://www.facebook.com/sharer/sharer.php?u=pr0x.me/${link.link}`} target="_blank" rel="noopener noreferrer" className="btn btn-warning">
                                    Chia sẻ
                                    </a>
                                </div>
                            </div>
                        )

                    })
                )
            }
        </>
    );
}

export default CreateLinkForm;