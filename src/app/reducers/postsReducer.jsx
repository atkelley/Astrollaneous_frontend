export const postsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_POST":
      return state.map((post) => post.id === action.payload.id ? action.payload : post);
    case "SET_POSTS":
    case "SET_USER_POSTS":
      return action.payload; 
    case "CREATE_OR_UPDATE_POST":
      const updatedPosts = state.map((post) => post.id === action.payload.id ? action.payload : post);

      if (!updatedPosts.some((post) => post.id === action.payload.id)) {
        updatedPosts.unshift(action.payload);
      }
      
      return updatedPosts;
    case "DELETE_POST":
      return state.filter((post) => post.id !== action.payload);
    default:
      return state;
  }
};