import axiosClient from "./axiosClient";

const posterApi = {
  create(data) {
    const url = "/api/posters/create";
    return axiosClient.post(url, data);
  },

  getAll(data) {
    const url = "/api/posters/list";
    return axiosClient.get(url, data);
  },

  update(data) {
    const url = "/api/posters/update";
    return axiosClient.put(url, data);
  },

  delete(id) {
    const url = `/api/posters/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default posterApi;
