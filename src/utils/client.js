import axios from 'axios';
import { MENS_RANKINGS } from '../constants/urls';

/**
 * Wraps a promise so it can be used with React Suspense
 * @param {Promise} promise The promise to process
 * @returns {Object} A response object compatible with Suspense
 */
function wrapPromise(promise) {
  // debugger;
  let status = 'pending';
  let response;

  const suspender = promise.then(
    res => {
      status = 'success';
      response = res;
    },
    err => {
      status = 'error';
      response = err;
    },
  );

  const handler = {
    pending: () => {
      throw suspender;
    },
    error: () => {
      throw response;
    },
    default: () => response,
  };

  const read = () => {
    const result = handler[status] ? handler[status]() : handler.default();
    return result;
  };

  return { read };
};

function fetchData(url) {
  const promise = axios.get(url).then(({data}) => data);

  return wrapPromise(promise);
}



export function fetchRankings() {
  // console.log();

  // try {
  //   const { data } = await axios.get(MENS_RANKINGS);
  //   return data;
  // } catch (error) {
  //   return Promise.reject(error)
  // }
  return fetchData(MENS_RANKINGS);
}