import environment from '@/conifg/environment';
import axios from 'axios';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

interface CustomSession extends Session {
  accessToken?: string;
}

const headers = {
  'Content-Type': 'application/json',
};

const instance = axios.create({
  baseURL: environment.API_URL,
  headers,
  timeout: 60 * 1000,
});

//interceptors untuk mengecek error dan session
instance.interceptors.request.use(
  async request => {
    //token manual
    let token: string | undefined;
    if (
      process.env.NODE_ENV === 'development' &&
      process.env.NEXT_PUBLIC_USE_MOCK_SESSION === 'true'
    ) {
      token = process.env.MOCK_ACCESS_TOKEN;
    } else {
      const session: CustomSession | null = await getSession();
      token = session?.accessToken;
    }
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;

    // const session: CustomSession | null = await getSession();
    // //untuk set header dengan token yang tersedia
    // if (session && session.accessToken) {
    //   request.headers.Authorization = `Bearer ${session.accessToken}`;
    // }
    // //agar tidak selalu request token saat ingin requrest
    // return request;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export default instance;
