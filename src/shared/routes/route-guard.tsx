import { useEffect, useState } from "react";
import SignIn from "../../Components/SignIn";
import SignUp from "../../Components/SignUp";
import { ROUTE_FORGOT_PASSWORD, ROUTE_HOME, ROUTE_SIGNIN, ROUTE_SIGNUP } from "./routes.constant";
import { Routes, Route } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";
import Home from "../../Components/Home";
import ForgotPassword from "../../Components/ForgotPassword";

const PermittedRoutes: any[] = [
  {
    name: "Home page",
    route: ROUTE_HOME,
    component: <Home />,
  },
];

const AppRoutes = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt") || false;
    setAuth(!!token);
  }, []);

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        {PermittedRoutes.map((route: any, i: number) => (
          <Route key={i} path={route.route} element={route.component} />
        ))}
      </Route>
      {/* Conditional Routes */}
      <Route path={ROUTE_SIGNIN} element={auth ? <Navigate to={ROUTE_HOME} /> : <SignIn />} />
      <Route path={ROUTE_SIGNUP} element={auth ? <Navigate to={ROUTE_HOME} /> : <SignUp />} />
      <Route path={ROUTE_FORGOT_PASSWORD} element={auth ? <Navigate to={ROUTE_HOME} /> : <ForgotPassword />} />
      {/* Redirect all arbitrary sub-routes to index */}
      <Route path="/*" element={<Navigate to={ROUTE_HOME} />}  />
    </Routes>
  );
};

const PrivateRoutes = () => {
  const auth = localStorage.getItem("jwt") ? true : false;
  return auth ? <Outlet /> : <Navigate to={ROUTE_SIGNIN} />;
};

export default AppRoutes;
export { PrivateRoutes };
