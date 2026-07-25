import { CamperFilters, CamperItem } from '@/types/types';
import axios from 'axios';

export type CampersListResponse = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: CamperItem[];
};

axios.defaults.baseURL = 'https://campers-api.goit.study';

export const getCampersList = async (filters: CamperFilters, page: number, perPage = 4) => {
  const res = await axios.get<CampersListResponse>('/campers', {
    params: {
      ...filters,
      page,
      perPage,
    },
  });
  return res.data;
};

export const getCampersFilters = async () => {
  const res = await axios.get<CamperFilters>('/campers/filters');
  return res.data;
};
