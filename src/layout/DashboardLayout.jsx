import { Route, Routes } from "react-router-dom";
import routes from "../routes";
import { AppNavbar } from "../widgets/layout";

export function DashboardLayout() {

  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <AppNavbar />

      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "dashboard" &&
            pages.map(({ element, path }, index) => (
              <Route key={index} path={path} element={element} />
            ))
        )}
      </Routes>
    </div>
  );
}

export default DashboardLayout;
