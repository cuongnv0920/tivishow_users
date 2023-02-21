import axiosClient from "api/axios.Client";
import contentType from "configs/contentType.conf";

const configFormData = {
  headers: contentType.headersFormData,
};
const configJson = {
  headers: contentType.headersJson,
};

export const filmApi = {
  create(data) {
    const url = "/film/create";
    return axiosClient.post(url, data, configFormData);
  },

  getAll(params) {
    const url = "/film/getAll";
    return axiosClient.get(url, { params }, configJson);
  },

  update(data) {
    const url = `/film/update/${data.id}`;
    return axiosClient.put(url, data, configFormData);
  },

  delete(data) {
    const url = `/film/delete/${data.id}`;
    return axiosClient.put(url, data, configJson);
  },
};
