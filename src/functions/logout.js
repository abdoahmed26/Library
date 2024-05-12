import { deleteUser } from "../redux/userSlice";

export const logout = (myUrl,dispatch) => {
  localStorage.removeItem("token");
  dispatch(deleteUser())
  myUrl("/");
  window.location.reload();
};
