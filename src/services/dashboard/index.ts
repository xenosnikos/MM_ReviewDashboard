import { DashboardDataResponse } from "@/models";
import api from "../api/index";

export const getDashboardData = async (
  client: string
): Promise<DashboardDataResponse> => {
  return await new Promise((resolve, reject) => {
    api
      .get("/getDashboardData", {
        params: { client }
      })
      .then((response) => {
        if (response?.data?.status === "success" && response?.data?.data)
          resolve(response.data.data);
        else reject("Something went wrong");
      })
      .catch((error) => {
        if (error?.message) reject(error.message);
        else reject("Something went wrong");
      });
  });
};

function formatDate(date: Date | string, isEndDate: boolean = false) {
  // Handle ISO string
  const d = date instanceof Date ? date : new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  const baseDate = `${year}-${month}-${day}`;
  return isEndDate ? `${baseDate} 23:59:59` : `${baseDate} 00:00:00`;
}

export const getDashboardDateData = async (
  client: string,
  value: any,
  currentMonth: Boolean
): Promise<DashboardDataResponse> => {
  let startdate, enddate;

  if (currentMonth) {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    startdate = formatDate(firstDay);
    enddate = formatDate(lastDay, true);
  } else {
    startdate = formatDate(value[0]?.startDate);
    enddate = formatDate(value[0]?.endDate, true);
  }

  const url = `/getDashboardDateData?client=${client}&startdate=${encodeURIComponent(
    startdate
  )}&enddate=${encodeURIComponent(enddate)}`;

  return await new Promise((resolve, reject) => {
    api
      .get(url)
      .then((response) => {
        if (response?.data?.status === "success" && response?.data?.data)
          resolve(response.data.data);
        else reject("Something went wrong");
      })
      .catch((error) => {
        console.error("API Error:", error);
        if (error?.message) reject(error.message);
        else reject("Something went wrong");
      });
  });
};
