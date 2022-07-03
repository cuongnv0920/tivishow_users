import axiosClient from "./axiosClient";

const authApi = {
  login(data) {
    const url = "/api/auth/login";
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/api/auth/update/${data.id}`;
    return axiosClient.put(url, data);
  },
};

export default authApi;
