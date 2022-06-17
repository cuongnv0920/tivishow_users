import axiosClient from "./axiosClient";

const userApi = {
  register(data) {
    const url = "/api/users/register";
    return axiosClient.post(url, data);
  },

  getAll(data) {
    const url = "/api/users/list";
    return axiosClient.get(url, data);
  },

  update(data) {
    const url = `/api/users/update/${data.id}`;
    return axiosClient.put(url, data);
  },

  delete(id) {
    const url = `/api/users/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default userApi;
