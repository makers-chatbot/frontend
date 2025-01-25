import { Route, Routes } from "react-router-dom";
import routes from "../routes";
import { AppNavbar } from "../widgets/layout";

export function ProductLayout() {
    return (
        <div className="h-screen w-full flex flex-col items-center">
            <AppNavbar />

            <Routes>
                {routes.map(
                    ({ layout, pages }) =>
                        layout === "products" &&
                        pages.map(({ element, path }, index) => (
                            <Route key={index} path={path} element={element} />
                        ))
                )}
            </Routes>
        </div>
    )
}

export default ProductLayout
