export const logout = (myUrl) => {
  localStorage.removeItem("token");
  myUrl("/");
  window.location.reload();
};
