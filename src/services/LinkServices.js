import * as request from '~/utils/httpRequest';

export const store = async (params) => {
    try {
        const res = await request.post(`/links/store`, params);
        return res.data;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}