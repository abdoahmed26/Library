export const logout = (myUrl) => {
  localStorage.removeItem("token");
  myUrl("/");
};
