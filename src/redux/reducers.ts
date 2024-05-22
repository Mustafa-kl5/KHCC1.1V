import { SHOW_TOAST_MESSAGE } from "utils/constant";

export const toastMessageReducer = (state = { message: {} }, action: any) => {
  switch (action.type) {
    case SHOW_TOAST_MESSAGE:
      return { ...state, message: action.message };
    default:
      return state;
  }
};
