import styles from "../styles/Shop.module.css";
import useProduct from "../hooks/useProduct";
import Product from "../components/Product";
import ProductSkeleton from "../components/ProductSkeleton";
import ProductError from "../components/ProductError";
import { useOutletContext } from "react-router";
import ACTIONS from "../cartActions";

const Shop = () => {
  const [_, dispatch] = useOutletContext();
  const { loading, products, error, refetch } = useProduct();

  const renderContent = () => {
    if (loading) {
      return (
        <div
          className={styles.loadingWrapper}
          role="status"
          aria-label="loading products"
        >
          {[...Array(20)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      );
    }

    if (error) {
      return <ProductError onRetry={refetch} />;
    }

    return (
      <ul className={styles.products}>
        {products.map((product) => (
          <li key={product.id}>
            <Product
              {...product}
              onAddToCart={(quantity) =>
                dispatch({
                  type: ACTIONS.ADDED_ITEM_TO_CART,
                  payload: { ...product, quantity },
                })
              }
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section>
      <h2 className={styles.sectionTitle}>Browse Products</h2>
      {renderContent()}
    </section>
  );
};

export default Shop;
