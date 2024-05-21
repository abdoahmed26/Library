import { deleteUser } from "../redux/userSlice";

export const logout = (dispatch) => {
  localStorage.removeItem("token");
  dispatch(deleteUser())
};
