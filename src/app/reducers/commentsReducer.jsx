export const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_COMMENTS":
    case "SET_USER_COMMENTS":
      return action.payload;
    case "CREATE_OR_UPDATE_COMMENT":
      const updatedComments = state.map((comment) => 
        comment.id === action.payload.id ? action.payload : comment
      );

      if (!updatedComments.some((comment) => comment.id === action.payload.id)) {
        updatedComments.unshift(action.payload);
      }
      
      return updatedComments;
    case "DELETE_COMMENT":
      return state.filter((comment) => comment.id !== action.payload);
    default:
      return state;
  }
};