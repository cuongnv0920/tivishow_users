import axiosClient from "./axiosClient";

const userApi = {
  register(data) {
    const url = "/api/users/register";
    return axiosClient.post(url, data);
  },
};

export default userApi;
