import axiosClient from "api/axios.Client";

export const posterApi = {
  create(data) {
    const url = "/api/poster/create";
    return axiosClient.post(url, data);
  },

  getAll(data) {
    const url = "/api/poster/getAll";
    return axiosClient.get(url, data);
  },

  update(data) {
    const url = "/api/poster/update";
    return axiosClient.put(url, data);
  },

  delete(id) {
    const url = `/api/poster/delete/${id}`;
    return axiosClient.delete(url);
  },
};
