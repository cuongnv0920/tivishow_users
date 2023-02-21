import axiosClient from "api/axios.Client";
import contentType from "configs/contentType.conf";

const configFormData = {
  headers: contentType.headersFormData,
};

export const posterApi = {
  create(data) {
    const url = "/poster/create";
    return axiosClient.post(url, data, configFormData);
  },

  getAll(data) {
    const url = "/poster/getAll";
    return axiosClient.get(url, data, configFormData);
  },

  update(data) {
    const url = `/poster/update/${data.id}`;
    return axiosClient.put(url, data, configFormData);
  },

  delete(data) {
    const url = `/poster/delete/${data.id}`;
    return axiosClient.put(url, data);
  },
};
