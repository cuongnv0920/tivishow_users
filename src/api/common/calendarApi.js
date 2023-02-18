import axiosClient from "api/axios.Client";

export const calendarApi = {
  getAll(data) {
    const url = "/api/calendars/list";
    return axiosClient.get(url, data);
  },
};
