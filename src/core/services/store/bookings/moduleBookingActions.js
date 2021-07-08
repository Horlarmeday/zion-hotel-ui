import axios from "../../../../axios";

export default {
  addBooking({ commit }, booking) {
    return new Promise((resolve, reject) => {
      axios
        .post("/bookings", booking)
        .then(response => {
          commit("ADD_BOOKING", response.data.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  fetchBookings({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get("/bookings", {
          params: {
            currentPage: payload.currentPage,
            pageLimit: payload.itemsPerPage,
            search: payload.search,
            start: payload.start,
            end: payload.end
          }
        })
        .then(response => {
          commit("SET_BOOKINGS", response.data.data.docs);
          commit("SET_BOOKINGS_TOTAL", response.data.data.total);
          commit("SET_NUMB_PAGES", response.data.data.pages);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  fetchBooking({ commit }, bookingId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/bookings/${bookingId}`)
        .then(response => {
          commit("SET_BOOKING", response.data.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  checkIn({ commit }, bookingId) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/bookings/check-in/${bookingId}`)
        .then(response => {
          commit("SET_BOOKING", response.data.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  checkOut({ commit }, bookingId) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/bookings/check-out/${bookingId}`)
        .then(response => {
          commit("SET_BOOKING", response.data.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  addBookingAddons({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/bookings/addons/${payload.bookingId}`, payload.addons)
        .then(response => {
          commit("SET_BOOKING", response.data.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
