import Home from "../components/Home";
import Login from "../components/Login";
// import LoginComponent from "../components/LoginComponent";

const routes = [
  { path: "/", exact: true, name: "Home", component: Home },
  // { path: "/", exact: true, name: "Home", component: Home },
  { path: "/login", exact: true, name: "Login", component: Login }
];

export default routes;
