import axiosClient from "./axiosClient";

const amplitudeApi = {
  create(data) {
    const url = "/api/amplitudes/create";
    return axiosClient.post(url, data);
  },

  getAll(data) {
    const url = "/api/amplitudes/list";
    return axiosClient.get(url, data);
  },

  update(data) {
    const url = `/api/amplitudes/update/${data.id}`;
    return axiosClient.put(url, data);
  },

  delete(id) {
    const url = `/api/amplitudes/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default amplitudeApi;
