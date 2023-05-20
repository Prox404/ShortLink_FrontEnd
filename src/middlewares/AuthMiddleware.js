import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthMiddleware() {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            navigate('/login');
        }
    }, [navigate]);
}

export default AuthMiddleware;