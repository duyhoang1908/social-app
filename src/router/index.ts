import Chat from "../Pages/Chat";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import SearchResult from "../Pages/SearchResult";
import UserPage from "../Pages/User";

export const publicRoutes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/user/:uid",
    component: UserPage,
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
  {
    path: "/search/:name",
    component: SearchResult,
  },
];
