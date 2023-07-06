import api from "../api/index";

export const getClientSocialMedia = async (clientid: string, title?: string) => {
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

export const createClientSocialmedialink = async (params) => {
  return await new Promise((resolve, reject) => {
    api
      .post("/createClientSocialmedialink", params)
      .then((response) => {
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
