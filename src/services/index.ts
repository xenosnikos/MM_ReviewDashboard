import axios from 'axios';

const BACKEND_API_URL = 'http://localhost:8000/api';

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
          console.log(error);
        });
    }
  );

}

export {
  getDashboardData
}