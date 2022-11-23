import axios from 'axios';
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const getDashboardData = (client: string) => {
  const url = `${BACKEND_API_URL}/getDashboardData`;
  return new Promise(
    (resolve, reject) => {
      axios
        .get(url, {
          params: {client}
        })
        .then(response => {
          if (response?.data?.status === 'success' && response?.data?.data)
            resolve(response.data.data);
          else
            reject('Something went wrong');
        })
        .catch(error => {
          if (error?.message)
            reject(error.message);
          else
            reject("Something went wrong");
        });
    }
  );
}

const getReviewsData = (url: string, params: {client: string, per_page: number, page: number, sources: string, ratings: string}) => {
  return new Promise(
    (resolve, reject) => {
      axios
        .get(url, {
          params,
        })
        .then(response => {
          if (response?.data?.status === 'success' && response?.data?.data)
            resolve(response.data.data);
          else
            reject('Something went wrong');
        })
        .catch(error => {
          if (error?.message)
            reject(error.message);
          else
            reject("Something went wrong");
        });
    }
  );
}

export {
  getDashboardData,
  getReviewsData
}