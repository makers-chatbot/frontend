import ProductCard from './ProductCard';
import { getProducts, getProductsByCategory } from "../../services/ProductServices";
import { Spinner } from "@material-tailwind/react";
import { ErrorBlock } from "../blocks";
import { useEffect, useState } from "react";
import { useSortedCategories } from '../../hooks/usePreferredCategories';

export function RecommendedProducts() {

    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { categories, isLoading, error: categroyError, refetch } = useSortedCategories();
    console.log("Categories sorted: ", categories);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = (!isLoading && categories) ? await getProductsByCategory(categories[0].category) : await getProducts();
                setRecommendedProducts(response.data);
            } catch (err) {
                setError("Error al cargar los productos");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [categories]);

    if (loading) {
        return <Spinner />;
    }
    if (error) {
        return <ErrorBlock error={error} />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default RecommendedProducts;
