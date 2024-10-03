import { Client } from "@/models";
import api from "../api/index";

export const getClient = async (userId: number): Promise<Client[]> => {
  try {
    const response = await api.get("/getClient", { params: { userId: userId } });
    if (response?.data?.status === "success" && Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Something went wrong");
    }
  }
};
