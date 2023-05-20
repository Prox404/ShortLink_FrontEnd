import { toast } from 'react-toastify';

import * as request from '~/utils/httpRequest';

export const refreshNewToken = async (params) => {
    try {
        const res = await request.post(`/users/refresh-token`, params);
        localStorage.setItem('accessToken', res.accessToken);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export const store = async (params) => {
    try {
        const res = await request.post(`/links/store`, params);
        return res;
    } catch (error) {
        if (error.response.status === 401) {
            
            const refreshToken = localStorage.getItem('refreshToken');
            let params = {
                refreshToken: refreshToken
            }
            await refreshNewToken(params);
            return undefined;
        }
        toast.error(error.response.data.error ?? 'Failed to store link');
        return undefined;
    }
}

export const getUserLink = async (page) => {
    try {
        
        const res = await request.get(`/links/get?page=${page}`);
        return res;
    } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 401) {
            
            const refreshToken = localStorage.getItem('refreshToken');
            let params = {
                refreshToken: refreshToken
            }
            await refreshNewToken(params);
            return undefined;
        }
        error.response.data.error ?? toast.info(error.response.data.error);
        return undefined;
    }
}

export const getLink = async (shortLink) => {
    try {
        const res = await request.get(`/links/show/${shortLink}`);
        return res;
    } catch (error) {
        return undefined;
    }
}

export const getLinkHasPassword = async (id, params) => {
    try {
        const res = await request.post(`/links/show/${id}`, params);
        return res;
    } catch (error) {
        toast.error(error.response.data.error ?? 'Failed to get link');
        return undefined;
    }
}

export const overview = async () => {
    try {
        const res = await request.get(`/links/overview`);
        return res;
    } catch (error) {
        if (error.response.status === 401) {
            
            const refreshToken = localStorage.getItem('refreshToken');
            let params = {
                refreshToken: refreshToken
            }
            await refreshNewToken(params);
            return undefined;
        }
        toast.error(error.response.data.error ?? 'Failed to get overview');
        return undefined;
    }
}

export const deleteLink = async (short_link) => {
    try {
        const res = await request.del(`/links/destroy/${short_link}`);
        return res;
    } catch (error) {
        if (error.response.status === 401) {
            
            const refreshToken = localStorage.getItem('refreshToken');
            let params = {
                refreshToken: refreshToken
            }
            await refreshNewToken(params);
            return undefined;
        }
        toast.error(error.response.data.error ?? 'Failed to delete link');
        return undefined;
    }
}

export const update = async (params, short_link) => {
    try {
        const res = await request.put(`/links/update/${short_link}`, params);
        return res;
    } catch (error) {
        if (error.response.status === 401) {
            
            const refreshToken = localStorage.getItem('refreshToken');
            let params = {
                refreshToken: refreshToken
            }
            await refreshNewToken(params);
            return undefined;
        }
        toast.error(error.response.data.error ?? 'Failed to update link');
        return undefined;
    }
}