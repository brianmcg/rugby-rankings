import axios from 'axios';
import { MENS_RANKINGS } from '@constants/urls';

async function fetchData(url) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return Promise.reject(error)
  }
}

export const fetchRankings = () => fetchData(MENS_RANKINGS);
