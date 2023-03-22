import axios from 'axios';
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const urlData = `${BACKEND_API_URL}/getDashboardData`;
const urlReviews = `${BACKEND_API_URL}/getReviewsData`;

const getDashboardData = async (client: string) => {  
  return await new Promise(
    (resolve, reject) => {
      axios
        .get(urlData, {
          params: {client}
        })
        .then(response => {
         const removeD = response.data.substring(1);
         const res = JSON.parse(removeD);
          if (res?.status === 'success' && res.data)
            resolve(res.data);
          else
            reject("Something went wrong");
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

const getReviewsData = async (params: {client: string, per_page: number, page: number, sources: string, ratings: string}) => {
  return await new Promise(
    (resolve, reject) => {
      axios
        .get(urlReviews, {
          params,
        })
        .then(response => {
          const removeD = response.data.substring(1);
          const res = JSON.parse(removeD);
           if (res?.status === 'success' && res.data)
             resolve(res.data);
           else
             reject("Something went wrong");
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