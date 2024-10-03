import { IFormData } from "@/models";
import api from "../api/index";

interface IUserData {
  id: number;
  username: string;
  email: string;
  roleid: number;
  remember_token: string;
}

export const postSignin = async (params: IFormData): Promise<IUserData> => {
  return new Promise((resolve, reject) => {
    api
      .post("/login", params)
      .then((response) => {
        if (response?.data?.status === "success") {
          const userData: IUserData = {
            ...response.data.data,
            remember_token: "cd4db1885dfaf939a6684f968a8c2f755f3f38b9d" // added makeshift token for login
          };

          if (userData.roleid === 4) {
            reject("Access denied. Your role does not have permission to sign in.");
            return;
          }

          // Store user data in localStorage
          localStorage.setItem("user", JSON.stringify(userData));

          resolve(userData);
        } else if (
          response?.data?.message === "username not match" ||
          response?.data?.message === "password not match"
        ) {
          reject(response?.data?.message);
        } else {
          reject("Something went wrong");
        }
      })
      .catch((error) => {
        if (error?.message) reject(error.message);
        else reject("Something went wrong");
      });
  });
};

// Function to get the current user's role
export const getUserRole = (): number | null => {
  const userString = localStorage.getItem("user");
  if (!userString) return null;
  const userData: IUserData = JSON.parse(userString);
  return userData.roleid;
};

// Function to get the current user's data
export const getCurrentUser = (): IUserData | null => {
  if (typeof window !== "undefined") {
    const userString = localStorage.getItem("user");
    if (!userString) return null;
    return JSON.parse(userString);
  }
  return null;
};
