import styles from "../styles/ProductError.module.css";
import { PackageX, RotateCcw } from "lucide-react";

const ProductError = ({ onRetry }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.iconWrapper}>
        <PackageX size={40} strokeWidth={1.5} />
      </div>
      <h2>Could not load products</h2>
      <p>
        Something went wrong while fetching the products. Check your connection
        and try again.
      </p>
      {onRetry && (
        <button className={styles.retryBtn} onClick={onRetry}>
          <RotateCcw size={15} strokeWidth={2} />
          Try again
        </button>
      )}
    </div>
  );
};

export default ProductError;
