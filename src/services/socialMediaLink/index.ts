import {
  ClientSocialMediaLink,
  CreateClientSocialMediaLink,
  EditClientSocialMediaLink
} from "@/models";
import api from "../api/index";

const getClientSocialMediaLink = async (
  clientid: string,
  title?: string
): Promise<ClientSocialMediaLink[]> => {
  return await new Promise((resolve, reject) => {
    api
      .get("/getClientSocialmedialink", {
        params: {
          clientid,
          title
        }
      })
      .then((response) => {
        console.log(response.data.data);
        if (response?.data?.status === "success") resolve(response.data.data);
        else reject("Something went wrong");
      })
      .catch((error) => {
        if (error?.message) reject(error.message);
        else reject("Something went wrong");
      });
  });
};

const createClientSocialMediaLink = async (params: CreateClientSocialMediaLink) => {
  return await new Promise((resolve, reject) => {
    api
      .post("/createClientSocialmedialink", params)
      .then((response) => {
        if (response?.data?.status === "success") resolve("success");
        if (response?.data?.message === "link already exist")
          reject(response?.data?.message);
        else reject("Something went wrong");
      })
      .catch((error) => {
        if (error?.message) reject(error.message);
        else reject("Something went wrong");
      });
  });
};

const deleteClientSocialMediaLink = async (id: number) => {
  return await new Promise((resolve, reject) => {
    api
      .post("/deleteClientSocialmedialink", { id })
      .then((response) => {
        if (response?.data?.status === "success") resolve("success");
        else reject("Something went wrong");
      })
      .catch((error) => {
        if (error?.message) reject(error.message);
        else reject("Something went wrong");
      });
  });
};

const editClientSocialMediaLink = async (params: EditClientSocialMediaLink) => {
  return await new Promise((resolve, reject) => {
    api
      .post("/editClientSocialmedialink", params)
      .then((response) => {
        if (response?.data?.status === "success") resolve("success");
        else reject("Something went wrong");
      })
      .catch((error) => {
        if (error?.message) reject(error.message);
        else reject("Something went wrong");
      });
  });
};

export {
  getClientSocialMediaLink,
  createClientSocialMediaLink,
  deleteClientSocialMediaLink,
  editClientSocialMediaLink
};
