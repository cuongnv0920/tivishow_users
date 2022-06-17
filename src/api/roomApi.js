import axiosClient from "./axiosClient";

const roomApi = {
  create(data) {
    const url = "/api/rooms/create";
    return axiosClient.post(url, data);
  },

  getAll(data) {
    const url = "/api/rooms/list";
    return axiosClient.get(url, data);
  },

  update(data) {
    const url = `/api/rooms/update/${data.id}`;
    return axiosClient.put(url, data);
  },

  delete(id) {
    const url = `/api/rooms/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default roomApi;
