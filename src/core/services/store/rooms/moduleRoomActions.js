import axios from "../../../../axios";

export default {
  addRoom({ commit }, room) {
    return new Promise((resolve, reject) => {
      axios
        .post("/rooms", room)
        .then(response => {
          commit("ADD_ROOM", response.data.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  fetchRooms({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/rooms")
        .then(response => {
          commit("SET_ROOMS", response.data.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  fetchRoom({ commit }, roomId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/rooms/${roomId}`)
        .then(response => {
          commit("SET_ROOM", response.data.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  updateRoom({ commit }, room) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`/rooms`, room)
        .then(response => {
          commit("UPDATE_ROOM", room);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
