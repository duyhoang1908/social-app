import "./App.css";
import { BrowserRouter, Outlet, Navigate } from "react-router-dom";
import { Route, Routes } from "react-router";
import { privateRoutes, publicRoutes } from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  let user;
  const value = localStorage.getItem("userInfo");
  if (typeof value === "string") {
    user = JSON.parse(value);
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default App;
