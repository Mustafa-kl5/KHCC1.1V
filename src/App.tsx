import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { getRoutes, publicRoutes } from "routes/routes";
import { isLoggedIn } from "services/authService";
import { iRoute } from "types/route";
import { USER_ROLE } from "utils/constant";
import ApiService from "./services/api";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ToastMassage from "Components/Shared/ToastMassage";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [privateRoutes, setPrivateRoutes] = useState<
    iRoute[] | string | undefined
  >([]);
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("Login");
    }
    ApiService.init();
  }, []);
  useEffect(() => {
    if (isLoggedIn()) {
      setPrivateRoutes(getRoutes(localStorage.getItem(USER_ROLE) || "pending"));
    }
  }, [location.pathname]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Routes>
        {publicRoutes.map((item) => {
          return (
            <Route key={item.path} element={item.element} path={item.path} />
          );
        })}
        {(privateRoutes as iRoute[]).map((item: iRoute) => {
          return (
            <Route key={item.path} element={item.element} path={item.path} />
          );
        })}
      </Routes>
      <ToastMassage />
    </LocalizationProvider>
  );
}

export default App;
