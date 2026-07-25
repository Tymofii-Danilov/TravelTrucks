import { Camper } from '@/types/types';
import axios from 'axios';

export type CampersListResponse = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
};

axios.defaults.baseURL = 'https://campers-api.goit.study';

export const getCampersList = async (filters: Camper, page: number) => {
  const res = await axios.get<CampersListResponse>('/campers', {
    params: {
      ...filters,
      page,
    },
  });
  return res.data;
};
