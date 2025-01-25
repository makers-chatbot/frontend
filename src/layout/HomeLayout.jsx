import { Route, Routes } from "react-router-dom";
import routes from "../routes";
import { AppNavbar } from "../widgets/layout";


export function HomeLayout() {
    return (
        <div className="h-screen w-full">
            <AppNavbar />
            <Routes>
                {routes.map(
                    ({ layout, pages }) =>
                        layout === "home" &&
                        pages.map(({ element, path }, index) => (
                            <Route key={index} path={path} element={element} />
                        ))
                )}
            </Routes>
        </div>

    )
}

export default HomeLayout
