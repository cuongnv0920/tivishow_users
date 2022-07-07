import axiosClient from "./axiosClient";

const sourceApi = {
  create(data) {
    const url = "/api/sources/create";
    return axiosClient.post(url, data);
  },

  getAll(data) {
    const url = "/api/sources/list";
    return axiosClient.get(url, data);
  },

  update(data) {
    const url = "/api/sources/update";
    return axiosClient.put(url, data);
  },

  delete(id) {
    const url = `/api/sources/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default sourceApi;
