import App from "./App";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <h2></h2>,
      },
      {
        path: "cart",
        // element: <CartView />,
      },
      {
        path: "shopping",
        // element: <ShoppingView />,
      },
    ],
  },
];

export default routes;
