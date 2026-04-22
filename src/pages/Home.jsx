import { Link } from "react-router";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <section className={styles.section}>
      <div>
        <h2 className={styles.title}>Your Favorite Store, Online</h2>
        <p className={styles.para}>
          Discover a wide range of products, from the latest gadgets to everyday
          essentials. start browsing today
        </p>
        <Link className={styles.btn} to={"shop"}>
          Shop now
        </Link>
      </div>
    </section>
  );
};

export default Home;
