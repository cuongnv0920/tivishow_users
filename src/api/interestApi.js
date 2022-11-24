import axiosClient from "./axiosClient";

const interestApi = {
  create(data) {
    const url = "/api/interests/create";
    return axiosClient.post(url, data);
  },

  getAll(params) {
    const url = `/api/interests/list/${params._page}`;
    return axiosClient.get(url, params);
  },

  getAllAdmin(data) {
    const url = "/api/interests/adminList";
    return axiosClient.get(url, data);
  },

  update(data) {
    const url = `/api/interests/update/${data.id}`;
    return axiosClient.put(url, data);
  },

  updateValid(data) {
    const url = `/api/interests/updateValid`;
    return axiosClient.put(url, data);
  },

  delete(id) {
    const url = `/api/interests/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default interestApi;
