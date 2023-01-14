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

export const register = async (params) => {
    try {
        const res = await request.post(`/users/signup`, params);
        return res;
    } catch (error) {
        console.log(error);
        toast.error('Invalid information');
        return undefined;
    }
}

export const profile = async () => {
    try {
        const res = await request.get(`/users/profile`);
        return res;
    } catch (error) {
        console.log(error);
        toast.error('Invalid information');
        return undefined;
    }
}

export const update = async (params) => {
    try {
        const res = await request.put(`/users/update`, params);
        return res;
    } catch (error) {
        console.log(error);
        toast.error('Invalid information');
        return undefined;
    }
}