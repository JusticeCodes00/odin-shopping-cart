import styles from "../styles/ProductSkeleton.module.css";

const ProductSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.image} />
      <div className={`${styles.line} ${styles.category}`} />
      <div className={styles.stars}>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className={styles.star} />
        ))}
      </div>
      <div className={`${styles.line} ${styles.title}`} />
      <div className={`${styles.line} ${styles.titleShort}`} />
      <div className={`${styles.line} ${styles.price}`} />
      <div className={styles.quantityRow}>
        <div className={styles.qtyButton} />
        <div className={styles.qtyInput} />
        <div className={styles.qtyButton} />
      </div>
      <div className={styles.addToCart} />
      <div className={`${styles.line} ${styles.desc}`} />
      <div className={`${styles.line} ${styles.desc}`} />
      <div className={`${styles.line} ${styles.descShort}`} />
    </div>
  );
};

export default ProductSkeleton;
