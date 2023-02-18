import axiosClient from "api/axios.Client";

export const filmApi = {
  create(data) {
    const url = "/api/film/create";
    return axiosClient.post(url, data);
  },

  getAll(data) {
    const url = "/api/film/getAll";
    return axiosClient.get(url, data);
  },

  update(data) {
    const url = "/api/film/update";
    return axiosClient.put(url, data);
  },

  delete(id) {
    const url = `/api/film/delete/${id}`;
    return axiosClient.delete(url);
  },
};
