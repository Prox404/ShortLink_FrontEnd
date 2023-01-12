import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as LinkServices from "~/services/LinkServices";
import { toast } from "react-toastify";

function EditLink() {
    const params = useParams();
    const navigate = useNavigate();
    const [link, setLink] = useState({});
    const [shortLink, setShortLink] = useState('');
    const [hasPassword, setHasPassword] = useState(false); // [false, true
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (!params.id) {
            navigate('/');
        } else {
            const getLink = async () => {
                const res = await LinkServices.getLink(params.id);
                if (res) {
                    setLink(res.data);
                    setHasPassword(res.data.password !== 'false');
                    setShortLink(res.data.short_link);
                }
            }
            getLink();
        }
    }, [params.id, navigate]);

    const generateLink = () => {

        console.log("call randomString");
        const length = 8;
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';

        for (let i = length; i > 0; --i) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        console.log("result: " + result);
        setShortLink(result);
    }

    const saveLink = async () => {
        const params = new URLSearchParams();
        params.append('link', link.link);
        params.append('password', password);
        params.append('short_link', shortLink);

        try {
            const res = await LinkServices.update(params, link.short_link);
            if (res) {
                toast.success('Update link successfully');
                setTimeout(() => {
                    navigate(-1);
                }, 3000);

            }
        } catch (error) {
            console.log(error); 
        }
    }

    console.log(hasPassword);
    return (<>
        {
            link && (
                <>
                    <h1>Edit Link</h1>

                    <div className="card mt-3">
                        <div className="form-group">
                            <label htmlFor="link">Link</label>
                            <input type="text" className="form-control mt-3" id="link" value={link.link} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="shortLink">Short Link</label>
                            <input onChange={(e) => setShortLink(e.target.value)} type="text" className="form-control mt-3" id="shortLink" value={shortLink} />
                            <button className="btn btn-primary mt-3" onClick={() => generateLink()} >Auto Generate</button>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input onChange={(e) => setHasPassword(e.target.checked)} type="checkbox" className="form-check-input ms-3 mt-2" id="password" checked={hasPassword} />
                            {
                                hasPassword && (<>
                                    <input onChange={(e) => setPassword(e.target.value)} type="text" className="form-control mt-3" id="password" value={password === 'false' ? "" : password} />
                                </>)
                            }

                        </div>

                        <button className="btn btn-primary mt-3" onClick={() => saveLink()}>Save</button>
                    </div>
                </>
            )
        }
    </>);
}

export default EditLink;