import { useEffect, useState } from "react";

const useProduct = () => {
  const [products, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Sever Error: ${res.status}`);
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        if (err.name === "AbortError") return;

        setError(err.message);
      } finally {
        if(!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);
  return { products, error, loading };
};

export default useProduct;
