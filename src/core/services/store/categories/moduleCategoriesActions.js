import axios from "../../../../axios";

export default {
  addCategory({ commit }, category) {
    return new Promise((resolve, reject) => {
      axios
        .post("/categories", category)
        .then(response => {
          commit(
            "ADD_CATEGORY",
            Object.assign(category, {
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

  fetchCategories({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/categories")
        .then(response => {
          commit("SET_CATEGORIES", response.data.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  fetchCategory({ commit }, categoryId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/categories/${categoryId}`)
        .then(response => {
          commit("SET_CATEGORY", response.data.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  updateCategory({ commit }, category) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`/categories`, category)
        .then(response => {
          commit("UPDATE_CATEGORY", category);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
