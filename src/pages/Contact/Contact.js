import classNames from "classnames/bind";
import { RiPhoneFill,RiFacebookLine, RiGithubLine, RiInstagramLine, RiMailFill, RiMapPin2Fill   } from "react-icons/ri";

import styles from "./Contact.module.scss";

const cx = classNames.bind(styles);

function Contact() {
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
                            <input type="email" className="form-control" id="email" placeholder="Enter your email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" className="form-control" id="subject" placeholder="Enter your subject"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea className="form-control" id="message" rows="3"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </> );
}

export default Contact;