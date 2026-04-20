import { Outlet } from "react-router";
import { useState } from "react";
import { Home, ShoppingCart, Store } from "lucide-react";
import CartBadge from "./components/CartBadge";
import NavLink from "./components/NavLink";

const App = () => {
  const [cartItems, setCartItems] = useState({});
  const count = Object.values(cartItems).length;

  return (
    <div>
      <header>
        <h1>OdinStore</h1>

        <NavLink to={"cart"}>
          <CartBadge count={count} />
          <ShoppingCart />
        </NavLink>
      </header>

      <main>
        <Outlet context={[cartItems, setCartItems]} />
      </main>

      <footer>
        <NavLink to={"/"}>
          <Home />
        </NavLink>

        <NavLink to={"shop"}>
          <Store />
        </NavLink>

        <NavLink to={"cart"}>
          <ShoppingCart />
        </NavLink>
      </footer>
    </div>
  );
};

export default App;
