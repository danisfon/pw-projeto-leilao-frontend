export const fakeUsers = [
  {
    email: "dani",
    password: "123",
  },
];

// Rodar isso uma vez (ex: no App ou main.jsx) para popular localStorage
localStorage.setItem("fakeUsers", JSON.stringify(fakeUsers));