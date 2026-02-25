export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token; // true if token exists
};