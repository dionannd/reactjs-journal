import request from ".";

const transactionRequest = {
  getTransaction: async (q = "") => {
    try {
      const response = await request.get(`transaction?q=${q}`);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  saveTransaction: async (payload) => {
    try {
      const response = await request.post("transaction/save", payload);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteTransaction: async (id) => {
    try {
      const response = await request.delete(`transaction/${id}/delete`);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getDetailTransaction: async (id) => {
    try {
      const response = await request.get(`transaction/${id}`);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getListDetail: async (id, page, q) => {
    try {
      const response = await request.get(
        `transaction/detail/${id}?page=${page}&pageSize=10&q=${q}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteDetailTransaction: async (payload, id) => {
    try {
      const response = await request.delete(`transaction/detail/${id}/delete`, {
        data: payload,
      });
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  saveDetailTransaction: async (payload, id) => {
    try {
      const response = await request.post(
        `transaction/detail/${id}/save`,
        payload
      );
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getDetailTipe: async (id) => {
    try {
      const response = await request.get(`transaction/detail/${id}/tipe`);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default transactionRequest;
