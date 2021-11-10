import request from ".";

const journalRequest = {
  getJournal: async (q = "") => {
    try {
      const response = await request.get(`journal?q=${q}`);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  saveJournal: async (payload) => {
    try {
      const response = await request.post("journal/", payload);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteJournal: async (id) => {
    try {
      const response = await request.delete(`journal/${id}`);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default journalRequest;
