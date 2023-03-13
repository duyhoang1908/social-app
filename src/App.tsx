import { BrowserRouter, Outlet, Navigate } from "react-router-dom";
import { Route, Routes, useNavigate } from "react-router";

import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { getUserWithUid } from "./utils/connectFirebase";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { userSelector, userSlice } from "./store/User";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { privateRoutes, publicRoutes } from "./router";
import { userInfo } from "os";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((router, index) => {
            const Page = router.component;
            return <Route path={router.path} key={index} element={<Page />} />;
          })}

          <Route element={<CheckUser />}>
            {privateRoutes.map((router, index) => {
              const Page = router.component;
              return (
                <Route path={router.path} key={index} element={<Page />} />
              );
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const CheckUser = () => {
  const { userInfo } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const value = localStorage.getItem("user");

  useEffect(() => {
    const data = JSON.parse(value as any);
    const fetchData = async () => {
      const userData = await getUserWithUid(data.uid);
      dispatch(userSlice.actions.setUser(userData));
    };
    if (typeof value === "string") {
      fetchData();
    }
    if (!Object.keys(userInfo)) {
      navigate("/login");
    }
  }, [value]);

  return typeof value === "string" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default App;
