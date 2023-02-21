import axiosClient from "api/axios.Client";

export const calendarApi = {
  getAll(data) {
    const url = "/calendar/getAll";
    return axiosClient.get(url, data);
  },
};
