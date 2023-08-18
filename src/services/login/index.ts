import { IFormData } from "@/models";
import api from "../api/index";

export const postSignin = async (params: IFormData) => {
  return await new Promise((resolve, reject) => {
    api
      .post("/login", params)
      .then((response) => {
        if (response?.data?.status === "success")
          resolve(
            (response.data.data.remember_token =
              "cd4db1885dfaf939a6684f968a8c2f755f3f38b9d") //added makeshift token for login
          );
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
