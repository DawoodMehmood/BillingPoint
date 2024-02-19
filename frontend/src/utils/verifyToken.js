const isTokenExpired = (token) => {
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    return exp < Date.now() / 1000;
  } catch {
    return true; // Assume expired or invalid if any error occurs
  }
};

const verifyToken = (token) => {
  return !!token && !isTokenExpired(token); // Simplified return statement
};

export default verifyToken;
