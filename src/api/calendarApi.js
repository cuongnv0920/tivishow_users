import axiosClient from "./axiosClient";

const calendarApi = {
  getAll(data) {
    const url = "/api/calendars/list";
    return axiosClient.get(url, data);
  },
};

export default calendarApi;
