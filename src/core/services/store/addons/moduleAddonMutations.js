export default {
  ADD_ADDON(state, addon) {
    state.addons.push(addon);
  },

  SET_ADDONS(state, addons) {
    state.addons = addons;
  },

  SET_ADDONS_TOTAL(state, total) {
    state.total = total;
  },

  SET_NUMB_PAGES(state, pages) {
    state.pages = pages;
  },

  SET_ADDON(state, addon) {
    state.addon = addon;
  },

  UPDATE_ADDON(state, addon) {
    const addonIndex = state.addons.findIndex(s => s.id === addon.id);
    Object.assign(state.addons[addonIndex], addon);
  }
};
