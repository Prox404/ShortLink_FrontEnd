import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function IsLoginMiddleware() {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            navigate('/');
        }
    }, [navigate]);

}

export default IsLoginMiddleware;