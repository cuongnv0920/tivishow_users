import axiosClient from "./axiosClient";

const exchangeRateApi = {
  create(data) {
    const url = "/api/exchangeRates/create";
    return axiosClient.post(url, data);
  },

  getAll(params) {
    const url = `/api/exchangeRates/list/${params._page}`;
    return axiosClient.get(url, params);
  },

  update(data) {
    const url = `/api/exchangeRates/update/${data.id}`;
    return axiosClient.put(url, data);
  },

  delete(id) {
    const url = `/api/exchangeRates/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default exchangeRateApi;
