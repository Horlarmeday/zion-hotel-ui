export default {
  ADD_BOOKING(state, booking) {
    state.bookings.push(booking);
  },

  SET_BOOKINGS(state, bookings) {
    state.bookings = bookings;
  },

  SET_BOOKINGS_TOTAL(state, total) {
    state.total = total;
  },

  SET_NUMB_PAGES(state, pages) {
    state.pages = pages;
  },

  SET_BOOKING(state, booking) {
    state.booking = booking;
  },

  UPDATE_BOOKING(state, booking) {
    const bookingIndex = state.bookings.findIndex(s => s.id === booking.id);
    Object.assign(state.bookings[bookingIndex], booking);
  }
};
