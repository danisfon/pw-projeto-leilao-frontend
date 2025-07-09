export const useAuth = () => {
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("fakeUsers")) || [];
    return users.find(
      (u) => u.email === email && u.password === password
    );
  };

  return { login };
};