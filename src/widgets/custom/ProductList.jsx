import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../../services/ProductServices";
import { Spinner } from "@material-tailwind/react";
import { ErrorBlock } from "../blocks";

export function ProductList({ category, searchQuery, sortOption }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getProducts();
                setProducts(response.data);
            } catch (err) {
                setError("Error al cargar los productos");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    if (loading) {
        return <Spinner />;
    }
    if (error) {
        return <ErrorBlock error={error} />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-16">
            {products && products
                .filter(
                    (product) => category === "All" || product.category === category
                )
                .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .sort((a, b) => (sortOption === "price-desc") ? b.price - a.price : a.price - b.price)
                .map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
        </div>
    );
}

export default ProductList;
