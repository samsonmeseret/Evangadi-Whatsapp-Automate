export const initialState = {
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SAVE_USER":
      return {
        user: action.payload,
      };
    default:
      break;
  }
};
