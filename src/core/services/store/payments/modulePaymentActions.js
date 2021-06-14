import axios from "../../../../axios";

export default {
  fetchPayments({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get("/accounts", {
          params: {
            currentPage: payload.currentPage,
            pageLimit: payload.itemsPerPage,
            search: payload.search,
            start: payload.start,
            end: payload.end
          }
        })
        .then(response => {
          commit("SET_PAYMENTS", response.data.data.docs);
          commit("SET_PAYMENTS_TOTAL", response.data.data.total);
          commit("SET_NUMB_PAGES", response.data.data.pages);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
