import request from ".";

const transactionRequest = {
  getTransaction: async (id) => {
    try {
      const response = await request.get(`transaction/${id}`);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getList: async (id, page, q) => {
    try {
      const response = await request.get(
        `transaction/list/${id}?page=${page}&pageSize=10&q=${q}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  saveTransaction: async (payload, id) => {
    try {
      const response = await request.post(`transaction/${id}`, payload);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteTransaction: async (payload, id) => {
    try {
      const response = await request.delete(`transaction/${id}`, {
        data: payload,
      });
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getTipe: async (id) => {
    try {
      const response = await request.get(`transaction/tipe/${id}`);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default transactionRequest;
