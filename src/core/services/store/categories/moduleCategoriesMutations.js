export default {
  ADD_CATEGORY(state, category) {
    state.categories.push(category);
  },

  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },

  SET_CATEGORY(state, category) {
    state.category = category;
  },

  UPDATE_CATEGORY(state, category) {
    const categoryIndex = state.categories.findIndex(s => s.id === category.id);
    Object.assign(state.categories[categoryIndex], category);
  }
};
