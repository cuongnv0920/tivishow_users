import axiosClient from "./axiosClient";

const interestApi = {
  create(data) {
    const url = "/api/interests/create";
    return axiosClient.post(url, data);
  },

  getAll(data) {
    const url = "/api/interests/list";
    return axiosClient.get(url, data);
  },

  update(data) {
    const url = `/api/interests/update/${data.id}`;
    return axiosClient.put(url, data);
  },

  delete(id) {
    const url = `/api/interests/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default interestApi;
