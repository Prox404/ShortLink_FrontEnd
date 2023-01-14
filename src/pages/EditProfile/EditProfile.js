import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import * as UserServices from "~/services/UserServices";
import styles from './EditProfile.module.scss';

const cx = classNames.bind(styles);

function EditProfile() {
    const params = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [previewAvatar, setPreviewAvatar] = useState('');


    useEffect(() => {
        if (!params.username) {
            navigate(-1);
        } else {
            const getUser = async () => {
                const res = await UserServices.profile();
                if (res) {
                    setUser(res.data);
                    setEmail(res.data.email);
                    setUsername(res.data.username);
                    setAvatar(res.data.avatar);
                }
            };
            getUser();

        }

        // return () => {
        //     cleanup
        // };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.username]);

    const handleReviewAvatar = () => {
        console.log('preview avatar');
        console.log(avatar);
        setPreviewAvatar(avatar);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    const handleSubmit = async () => {
        console.log('submit');
        let userParams = new URLSearchParams();
        userParams.append('username', username? username : user.username);
        userParams.append('email', email? email : user.email);
        userParams.append('avatar', avatar? avatar : user.avatar);
        try {
            const res = await UserServices.update(userParams);
            if (res) {
                console.log(res);
                localStorage.setItem('user', JSON.stringify(res.data));
                window.location.href = '/profile/' + res.data.username;
            }
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(user.email);
    return (<>
        {
            user && (<>
                <div className={`card ${cx('wrapper')}`}>
                    <h2>Edit Profile</h2>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" onChange={(e) => setUsername(e.target.value)} className="form-control" id="username" value={username} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" value={email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="avatar">Avatar</label>
                        <div className="input-group">

                            <input onChange={(e) => setAvatar(e.target.value)} type="text" className="form-control" id="avatar" value={avatar} />
                            <button className="btn btn-primary" onClick={() => handleReviewAvatar()}>Preview Avatar</button>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12 col-sm-6">
                                <label>Old avatar</label>
                                <center>
                                    <img src={user.avatar} alt="old-avatar" className={cx('img-fluid')} />
                                </center>
                            </div>
                            <div className="col-12 col-sm-6">
                                {
                                    previewAvatar && (<>
                                        <label>New avatar</label>
                                        <center>
                                            <img src={previewAvatar} alt="old-avatar" className={cx('img-fluid')} />
                                        </center>
                                    </>)
                                }
                            </div>
                        </div>
                    </div>

                    <button type="submit" onClick={() => handleSubmit()} className="btn btn-primary">Submit</button>
                </div>
            </>)
        }
    </>);
}

export default EditProfile;