import axiosClient from "./axiosClient";

const validApi = {
  create(data) {
    const url = "/api/valids/create";
    return axiosClient.post(url, data);
  },

  getAll(data) {
    const url = "/api/valids/list";
    return axiosClient.get(url, data);
  },
};

export default validApi;
