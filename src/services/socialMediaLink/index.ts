import {
  ClientSocialMediaLink,
  CreateClientSocialMediaLink,
  EditClientSocialMediaLink,
  DeleteClientSocialMediaLink
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

const deleteClientSocialMediaLink = async (params: DeleteClientSocialMediaLink) => {
  return await new Promise((resolve, reject) => {
    api
      .post("/deleteClientSocialmedialink", params)
      .then((response) => {
        if (response?.data?.status === "success") {
          resolve(response.data.message);
        } else {
          reject(response?.data?.message || "Failed to delete social media link");
        }
      })
      .catch((error) => {
        reject(
          error?.response?.data?.message ||
            error?.message ||
            "An error occurred while deleting the social media link"
        );
      });
  });
};

const editClientSocialMediaLink = async (params: EditClientSocialMediaLink) => {
  return await new Promise((resolve, reject) => {
    api
      .post("/editClientSocialmedialink", params)
      .then((response) => {
        if (response?.data?.status === "success") {
          resolve(response.data.data);
        } else {
          reject(response?.data?.message || "Failed to update social media link");
        }
      })
      .catch((error) => {
        reject(
          error?.response?.data?.message ||
            error?.message ||
            "An error occurred while updating the social media link"
        );
      });
  });
};

export {
  getClientSocialMediaLink,
  createClientSocialMediaLink,
  deleteClientSocialMediaLink,
  editClientSocialMediaLink
};
