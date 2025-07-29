import instance from '@/libs/axios/instance';
import endpoint from './endpoint.constant';
import { IShorten } from '@/types/shorten';

const shortenUrlServices = {
  shorten: (payload: IShorten) => instance.post(`${endpoint.SHORTEN}/shorten`, payload),
};

export default shortenUrlServices;
