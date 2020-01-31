export function saveAuthInfo(authInfo) {
  return localStorage.setItem("auth", JSON.stringify(authInfo));
}

export function getAuthInfo() {
  const authInfo = localStorage.getItem("auth");
  return authInfo ? JSON.parse(authInfo) : null;
}

export function clearAuthInfo() {
  return localStorage.clear();
}
