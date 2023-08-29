import { DashboardDataResponse } from "@/models";
import api from "../api/index";

export const getDashboardData = async (
  client: string
): Promise<DashboardDataResponse> => {
  return await new Promise((resolve, reject) => {
    api
      .get("/getDashboardData", {
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
