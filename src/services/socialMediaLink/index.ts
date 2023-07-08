import api from "../api/index";

export const getClientSocialMediaLink = async (clientid: string, title?: string) => {
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

export const createClientSocialMediaLink = async (params) => {
  return await new Promise((resolve, reject) => {
    api
      .post("/createClientSocialmedialink", params)
      .then((response) => {
        console.log(response);
        if (response?.data?.status === "success") resolve("success");
        else reject("Something went wrong");
      })
      .catch((error) => {
        console.log(error);
        if (error?.message) reject(error.message);
        else reject("Something went wrong");
      });
  });
};

export const deleteClientSocialMediaLink = async (id: number) => {
  return await new Promise((resolve, reject) => {
    api
      .post("/deleteClientSocialmedialink", { id })
      .then((response) => {
        console.log(response);
        if (response?.data?.status === "success") resolve("success");
        else reject("Something went wrong");
      })
      .catch((error) => {
        console.log(error);
        if (error?.message) reject(error.message);
        else reject("Something went wrong");
      });
  });
};
