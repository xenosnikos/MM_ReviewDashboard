import { Client } from "@/content/Dashboards/Tasks/SelectClient";
import { IFormData } from "@/content/Overview/Signin";
import axios from "axios";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const urlData = `${BACKEND_API_URL}/getDashboardData`;
const urlReviews = `${BACKEND_API_URL}/getReviewsData`;
const urlSignin = `${BACKEND_API_URL}/login`;
const urlClient = `${BACKEND_API_URL}/getClient`;

const getDashboardData = async (client: string) => {
  return await new Promise((resolve, reject) => {
    axios
      .get(urlData, {
        params: { client }
      })
      .then((response) => {
        if (response?.data?.status === "success" && response?.data?.data)
          resolve(response.data.data);
        else reject("Something went wrong");
      })
      .catch((error) => {
        if (error?.message) reject(error.message);
        else reject("Something went wrong");
      });
  });
};

const getReviewsData = async (params: {
  client: string;
  per_page: number;
  page: number;
  sources: string;
  ratings: string;
}) => {
  return await new Promise((resolve, reject) => {
    axios
      .get(urlReviews, {
        params
      })
      .then((response) => {
        if (response?.data?.status === "success" && response?.data?.data)
          resolve(response.data.data);
        else reject("Something went wrong");
      })
      .catch((error) => {
        if (error?.message) reject(error.message);
        else reject("Something went wrong");
      });
  });
};

const postSignin = async (params: IFormData) => {
  return await new Promise((resolve, reject) => {
    axios
      .post(urlSignin, params)
      .then((response) => {
        console.log(response);
        if (response?.data?.status === "success")
          resolve(response.data.data.remember_token);
        if (response?.data?.message === "username not match")
          reject(response?.data?.message);
        else reject("Something went wrong");
      })
      .catch((error) => {
        if (error?.message) reject(error.message);
        else reject("Something went wrong");
      });
  });
};

const getClient = async (): Promise<Client[]> => {
  return await new Promise((resolve, reject) => {
    axios
      .get(urlClient)
      .then((response) => {
        if (response?.data?.status === "success") resolve(response.data.data);
        else reject("Something went wrong");
      })
      .catch((error) => {
        if (error?.message) reject(error.message);
        else reject("Something went wrong");
      });
  });
};

export { getDashboardData, getReviewsData, postSignin, getClient };
