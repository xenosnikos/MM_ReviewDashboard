import { IFormData } from "@/content/Overview/Signin";
import api from "../api/index";

export const postSignin = async (params: IFormData) => {
  return await new Promise((resolve, reject) => {
    api
      .post("/login", params)
      .then((response) => {
        console.log(response);
        if (response?.data?.status === "success")
          resolve(response.data.data.remember_token);
        if (
          response?.data?.message === "username not match" ||
          response?.data?.message === "password not match"
        )
          reject(response?.data?.message);
        else reject("Something went wrong");
      })
      .catch((error) => {
        if (error?.message) reject(error.message);
        else reject("Something went wrong");
      });
  });
};
