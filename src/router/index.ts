import Chat from "../Pages/Chat";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

export const publicRoutes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
];

export const privateRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/message",
    component: Chat,
  },
];
