import request from ".";

const transactionRequest = {
  getTransaction: async () => {
    try {
      const response = await request.get("transaction");
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  saveTransaction: async (payload) => {
    try {
      const response = await request.post("transaction", payload);
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
  deleteDetailTransaction: async (payload) => {
    try {
      const response = await request.delete(`transaction/detail/delete`, {
        data: payload,
      });
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  saveDetailTransaction: async (payload, id) => {
    try {
      const response = await request.post(`transaction/detail/${id}`, payload);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default transactionRequest;
