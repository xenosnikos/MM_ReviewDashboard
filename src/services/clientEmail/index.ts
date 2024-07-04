import {
    CreateClientEmail,
    EditClientReminderEmail
  } from "@/models";
  import api from "../api/index";
  
  const getClientReminderEmails = async (
    clientid: string
  ): Promise<any[]> => {
    return await new Promise((resolve, reject) => {
      api
        .get("/getClientReminderEmails", {
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
  
  const createClientReminderEmail = async (params: CreateClientEmail) => {
    return await new Promise((resolve, reject) => {
      api
        .post("/createClientReminderEmails", params)
        .then((response) => {
          if (response?.data?.status === "success") resolve("success");
          if (response?.data?.message === "email already exist")
            reject(response?.data?.message);
          else reject("Something went wrong");
        })
        .catch((error) => {
          if (error?.message) reject(error.message);
          else reject("Something went wrong");
        });
    });
  };
  
  const deleteClientReminderEmail = async (id: number) => {
    return await new Promise((resolve, reject) => {
      api
        .post("/deleteClientReminderEmails", { id })
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
  
  const editClientReminderEmail = async (params: EditClientReminderEmail) => {
    return await new Promise((resolve, reject) => {
      api
        .post("/editClientReminderEmails", params)
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
    getClientReminderEmails,
    createClientReminderEmail,
    deleteClientReminderEmail,
    editClientReminderEmail
  };
  