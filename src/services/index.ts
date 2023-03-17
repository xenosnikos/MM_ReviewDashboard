import axios from 'axios';
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const urlData = `${BACKEND_API_URL}/getDashboardData`;
const urlReviews = `${BACKEND_API_URL}/getReviewsData`;

const getDashboardData = (client: string) => {  
  return new Promise(
    (resolve, reject) => {
      axios
        .get(urlData, {
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

const getReviewsData = (params: {client: string, per_page: number, page: number, sources: string, ratings: string}) => {
  return new Promise(
    (resolve, reject) => {
      axios
        .get(urlReviews, {
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