import { Client } from "@/content/Dashboards/Tasks/SelectClient";
import api from "../api/index";

export const getClient = async (): Promise<Client[]> => {
  return await new Promise((resolve, reject) => {
    api
      .get("/getClient")
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
