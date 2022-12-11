import { toast } from 'react-toastify';

import * as request from '~/utils/httpRequest';

export const login = async (params) => {
    try {
        const res = await request.post(`/users/login`, params);
        return res;
    } catch (error) {
        console.log(error);
        toast.error('Invalid email or password');
        return undefined;
    }
}