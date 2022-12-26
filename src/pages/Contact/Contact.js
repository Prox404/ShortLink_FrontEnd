import classNames from "classnames/bind";
import { useState } from "react";
import { toast } from "react-toastify";
import { RiPhoneFill,RiFacebookLine, RiGithubLine, RiInstagramLine, RiMailFill, RiMapPin2Fill   } from "react-icons/ri";

import styles from "./Contact.module.scss";

const cx = classNames.bind(styles);

function Contact() {

    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const validate = () => {
        const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!email_regex.test(email)) {
            toast.error("Email is not valid");
            return false;
        } else if (email.length === 0) {
            toast.error("Email is required");
            return false;
        } else if (subject.length === 0) {
            toast.error("Subject is required");
            return false;
        } else if (message.length === 0) {
            toast.error("Message is required");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (validate()) {
            let sendURL = "mailto:trancongtri@gmail.com?subject=" + subject + "&body=" + message;
            window.location.href = sendURL;
        }
    };

    return ( <>
        <h1 className="mb-4">Contact</h1>
        <div className="row">
            <div className={`col-12 card ${cx('card-wrapper')}`}>
                <div className="row">
                    <div className={`col-12 col-lg-6 card ${cx('card-left')}`}>
                        <h1>
                            Get a quote
                        </h1>

                        <p>
                            Fill out the form below and we will get back to you as soon as possible.
                        </p>

                        <div className={cx('user-info-wrapper')}>
                            <div className={cx('user-info-item')}>
                                <div className={cx('icon-wrapper')}>
                                    <RiPhoneFill/>
                                </div>
                                <div className={cx('text-wrapper')}>
                                    +84 868 009 674
                                </div>
                            </div>
                            <div className={cx('user-info-item')}>
                                <div className={cx('icon-wrapper')}>
                                    <RiMailFill/>
                                </div>
                                <div className={cx('text-wrapper')}>
                                    trancongtri@gmail.com
                                </div>
                            </div>
                            <div className={cx('user-info-item')}>
                                <div className={cx('icon-wrapper')}>
                                    <RiMapPin2Fill/>
                                </div>
                                <div className={cx('text-wrapper')}>
                                    Tien Phuoc, Quang Nam, Viet Nam
                                </div>
                            </div>
                        </div>

                        <div className={cx('social-wrapper')}>
                            <a href="https://www.facebook.com/Prox.Error404" className={cx('social-item')}>
                                <RiFacebookLine/>
                            </a>
                            <a href="https://github.com/Prox404" className={cx('social-item')}>
                                <RiGithubLine/>
                            </a>
                            <a href="https://www.instagram.com/prox_404" className={cx('social-item')}>
                                <RiInstagramLine/>
                            </a>
                        </div>
                    </div>
                    <div className={`col-12 col-lg-6 card ${cx('card-right')}`}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" placeholder="Enter your email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="form-control" id="subject" placeholder="Enter your subject"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea className="form-control" id="message" rows="3" value={message} onChange={(e) => setMessage(e.target.value)} ></textarea>
                        </div>
                        <button type="submit" onClick={()=>handleSubmit()} className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </> );
}

export default Contact;