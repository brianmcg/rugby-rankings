import axios from 'axios';
import { MENS_RANKINGS } from '../constants/urls';

export async function fetchRankings() {
  try {
    const { data } = await axios.get(MENS_RANKINGS);
    return data;
  } catch (error) {
    return Promise.reject(error)
  }
}