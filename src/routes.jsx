import { SignIn, SignUp } from "./pages/auth";
import { DeliveryCertificates, RentalContracts } from "./pages/contract";
import { Homepage } from "./pages/home";
import { CartAndFavorites, ProductDetail, ProductManagement, ProductPage } from "./pages/product";

export const routes = [

  {
    layout: "auth",
    pages: [
      {
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    layout: "products",
    pages: [
      {
        name: "detail",
        path: "/:id",
        element: <ProductDetail />,
      },
      {
        name: "favs",
        path: "/fav",
        element: <CartAndFavorites />,
      },
      {
        name: "management",
        path: "/manage",
        element: <ProductManagement />,
      },
      {
        name: "listing",
        path: "/",
        element: <ProductPage />,
      },
    ],
  },

  {
    layout: "home",
    pages: [
      {
        name: "homepage",
        path: "/",
        element: <Homepage />,
      },
    ],
  },
  {
    layout: "contracts",
    pages: [
      {
        name: "contracts",
        path: "/",
        element: <RentalContracts />,
      },
      {
        name: "delivery certificates",
        path: "/delivery-certificates",
        element: <DeliveryCertificates />,
      },
    ],
  },
];

export default routes;
