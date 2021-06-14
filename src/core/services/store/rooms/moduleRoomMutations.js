export default {
  ADD_ROOM(state, room) {
    state.rooms.push(room);
  },

  SET_ROOMS(state, rooms) {
    state.rooms = rooms;
  },

  SET_ROOM(state, room) {
    state.room = room;
  },

  UPDATE_ROOM(state, room) {
    const roomIndex = state.rooms.findIndex(s => s.id === room.id);
    Object.assign(state.rooms[roomIndex], room);
  }
};
