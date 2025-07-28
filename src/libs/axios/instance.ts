import environment from "@/conifg/environment";
import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface CustomSession extends Session {
    accessToken?: string;
}

const headers = {
    "Content-Type": 'application/json'
}

const instance = axios.create({
    baseURL: environment.API_URL,
    headers,
    timeout: 60 * 1000
});

//interceptors untuk mengecek error dan session
instance.interceptors.request.use(
    async (request) => {
        const session: CustomSession | null = await getSession();
        //untuk set header dengan token yang tersedia
        if (session && session.accessToken) {
            request.headers.Authorization = `Bearer ${session.accessToken}`
        }
        //agar tidak selalu request token saat ingin requrest
        return request;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
);

export default instance;