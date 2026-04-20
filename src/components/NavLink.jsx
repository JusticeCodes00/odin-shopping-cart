import { Link } from "react-router";
import styles from "../styles/NavLink.module.css";

const NavLink = ({ to, children }) => {
  return (
    <Link className={styles.navLink} to={to} aria-label={to}>
      {children}
    </Link>
  );
};

export default NavLink;
