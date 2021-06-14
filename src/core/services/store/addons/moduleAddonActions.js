import axios from "../../../../axios";

export default {
  addAddon({ commit }, addon) {
    return new Promise((resolve, reject) => {
      axios
        .post("/addons", addon)
        .then(response => {
          commit(
            "ADD_ADDON",
            Object.assign(addon, {
              id: response.data.data.id,
              createdAt: response.data.data.createdAt
            })
          );
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  fetchAddons({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get("/addons", {
          params: {
            currentPage: payload.currentPage,
            pageLimit: payload.itemsPerPage,
            search: payload.search
          }
        })
        .then(response => {
          commit("SET_ADDONS", response.data.data.docs);
          commit("SET_ADDONS_TOTAL", response.data.data.total);
          commit("SET_NUMB_PAGES", response.data.data.pages);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  fetchAddon({ commit }, addonId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/addons/${addonId}`)
        .then(response => {
          commit("SET_ADDON", response.data.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  updateAddon({ commit }, addon) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`/addons`, addon)
        .then(response => {
          commit("UPDATE_ADDON", addon);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
