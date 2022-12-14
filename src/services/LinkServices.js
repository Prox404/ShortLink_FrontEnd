import { toast } from 'react-toastify';

import * as request from '~/utils/httpRequest';

export const store = async (params) => {
    try {
        const res = await request.post(`/links/store`, params);
        return res;
    } catch (error) {
        toast.error(error.response.data.error ?? 'Failed to store link');
        return undefined;
    }
}

export const getUserLink = async () => {
    try {
        const res = await request.get(`/links/get`);
        return res;
    } catch (error) {
        toast.error(error.response.data.error ?? 'Failed to get user link');
        return undefined;
    }
}