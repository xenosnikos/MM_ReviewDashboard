import api from "../api/index";

export const getClientSocialMedia = async (clientid: string) => {
  return await new Promise((resolve, reject) => {
    api
      .get("/getClientSocialmedialink", {
        params: {
          clientid
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
