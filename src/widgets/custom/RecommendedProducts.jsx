import ProductCard from './ProductCard';
import { getProducts, getProductsByCategory } from "../../services/ProductServices";
import { Spinner } from "@material-tailwind/react";
import { ErrorBlock } from "../blocks";
import { useEffect, useState } from "react";
import { useSortedCategories } from '../../hooks/usePreferredCategories';
import PropTypes from 'prop-types';

export function RecommendedProducts({ preferenceLevel = "high" }) {
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { categories, isLoading } = useSortedCategories();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                let response;
                if (!isLoading && categories && categories.length > 0) {
                    // Get category based on preference level
                    let targetCategory;
                    switch (preferenceLevel) {
                        case "high":
                            targetCategory = categories[0]?.category;
                            break;
                        case "medium":
                            targetCategory = categories[Math.floor(categories.length / 2)]?.category;
                            break;
                        case "low":
                            targetCategory = categories[categories.length - 1]?.category;
                            break;
                        default:
                            targetCategory = categories[0]?.category;
                    }
                    response = await getProductsByCategory(targetCategory);
                } else {
                    response = await getProducts();
                }
                setRecommendedProducts(response.data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
                setError(`Error loading products: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [categories, isLoading, preferenceLevel]);

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

RecommendedProducts.propTypes = {
    preferenceLevel: PropTypes.oneOf(['high', 'medium', 'low'])
};

export default RecommendedProducts;
