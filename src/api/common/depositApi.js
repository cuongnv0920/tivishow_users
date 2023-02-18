import axiosClient from "api/axios.Client";
import contentType from "configs/contentType.conf";

const configJson = {
  headers: contentType.headersJson,
};

export const depositApi = {
  create(data) {
    const url = "/deposit/create";
    return axiosClient.post(url, data, configJson);
  },

  getAll(params) {
    const url = "/deposit/getAll";
    return axiosClient.get(url, { params }, configJson);
  },

  update(data) {
    const url = `/deposit/update/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },

  delete(data) {
    const url = `/deposit/delete/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },
};
