import { useEffect, useState } from 'react';
import {
    Breadcrumbs,
    Spinner
} from "@material-tailwind/react";
import { Footer } from '../../widgets/layout';
import RelatedProducts from '../../widgets/custom/RelatedProducts';
import { Product } from '../../widgets/custom';
import { Link, useParams } from 'react-router-dom';
import { ErrorBlock } from '../../widgets/blocks';
import { getProduct, getProductsByCategory } from '../../services/ProductServices';

export function ProductDetail() {

    const { id } = useParams();

    const [relatedProducts, setRelatedProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getProduct(id);
                setProduct(response.data);
            } catch (err) {
                setError("Error al cargar el producto seleccionado");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getProductsByCategory(product.category);
                setRelatedProducts(response.data.slice(0, 3));
            } catch (err) {
                setError("Error al cargar los productos relacionados");
            } finally {
                setLoading(false);
            }
        };
        fetchRelatedProducts();
    }, [product]);

    if (loading) {
        return <Spinner className='w-8 h-8' />;
    }
    if (error) {
        return <ErrorBlock error={error} />;
    }


    return (
        <div className="min-h-screen w-full bg-gray-50">
            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Breadcrumbs */}
                {product &&
                    <>
                        <Breadcrumbs className="bg-transparent">
                            <Link to="/">
                                Inicio
                            </Link>
                            <Link to="/products">
                                Productos
                            </Link>
                            <Link to="">
                                {product.name}
                            </Link>
                        </Breadcrumbs>

                        <Product product={product} />
                    </>
                }
                <RelatedProducts relatedProducts={relatedProducts} />

            </main>
            <Footer />
        </div>
    );
};

export default ProductDetail;