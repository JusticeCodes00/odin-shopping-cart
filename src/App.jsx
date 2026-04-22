import { NavLink, Outlet, useLocation } from "react-router";
import { useReducer, useEffect } from "react";
import { Home, ShoppingCart, Store } from "lucide-react";
import CartBadge from "./components/CartBadge";
import styles from "./App.module.css";
import ACTIONS from "./cartActions";

const handleNavClick = ({ isActive }) => (isActive ? styles.active : "");

const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADDED_ITEM_TO_CART: {
      const { id, quantity } = action.payload;
      const existingItem = state[id];
      if (existingItem) {
        return {
          ...state,
          [id]: {
            ...existingItem,
            quantity: existingItem.quantity + quantity,
          },
        };
      }
      return {
        ...state,
        [id]: action.payload,
      };
    }

    case ACTIONS.REMOVED_ITEM_FROM_CART: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }

    case ACTIONS.INCREASED_ITEM_QUANTITY: {
      const { id } = action.payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          quantity: state[id].quantity + 1,
        },
      };
    }

    case ACTIONS.DECREASED_ITEM_QUANTITY: {
      const { id } = action.payload;
      const newQuantity = state[id].quantity - 1;
      if (newQuantity <= 0) {
        const newState = { ...state };
        delete newState[id];
        return newState;
      }

      return {
        ...state,
        [id]: {
          ...state[id],
          quantity: newQuantity,
        },
      };
    }

    case ACTIONS.CLEARED_CART: {
      return {};
    }

    default: {
      throw new Error("unknown action: " + action.type);
    }
  }
};

const App = () => {
  const [cartItems, dispatch] = useReducer(cartReducer, {}, () => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : {};
  });

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const count = Object.values(cartItems).length;

  return (
    <div className={styles.app}>
      {/* Header Section */}
      <header className={styles.header}>
        <h1>
          Odin<span className={styles.leftHalf}>Store</span>
        </h1>
        <NavLink style={{ position: "relative" }} to={"cart"} aria-label="cart">
          <CartBadge count={count} />
          <ShoppingCart />
        </NavLink>
      </header>

      {/* Main Section */}
      <main className={styles.main}>
        <Outlet key={location.key} context={[cartItems, dispatch]} />
      </main>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <ul>
          <li>
            <NavLink className={handleNavClick} to={"/"} aria-label="/">
              <Home size={33} />
            </NavLink>
          </li>

          <li>
            <NavLink className={handleNavClick} to={"shop"} aria-label="shop">
              <Store size={33} />
            </NavLink>
          </li>

          <li>
            <NavLink className={handleNavClick} to={"cart"} aria-label="cart">
              <ShoppingCart size={33} />
            </NavLink>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default App;
