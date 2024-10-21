import { ReviewsDataResponse } from "@/models";
import api from "../api/index";

export const getReviewsData = async (params: {
  client: string;
  per_page: number;
  page: number;
  sources: string;
  ratings: string;
}): Promise<ReviewsDataResponse> => {
  return await new Promise((resolve, reject) => {
    api
      .get("/getReviewsData", {
        params
      })
      .then((response) => {
        console.log(response);
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
