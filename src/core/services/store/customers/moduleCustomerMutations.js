export default {
  ADD_CUSTOMER(state, customer) {
    state.customers.push(customer);
  },

  SET_CUSTOMERS(state, customers) {
    state.customers = customers;
  },

  SET_CUSTOMERS_TOTAL(state, total) {
    state.total = total;
  },

  SET_NUMB_PAGES(state, pages) {
    state.pages = pages;
  },

  SET_CUSTOMER(state, customer) {
    state.customer = customer;
  },

  UPDATE_CUSTOMER(state, customer) {
    const customerIndex = state.customers.findIndex(s => s.id === customer.id);
    Object.assign(state.customers[customerIndex], customer);
  }
};
