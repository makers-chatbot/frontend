import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Typography, Chip, Button } from '@material-tailwind/react';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { ImagePlacehoderSkeleton } from '../skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/features/cartSlice';
import { excludedProperties } from '../../data';
import { MessageAlert } from '../alerts';
import { postInteraction } from '../../services/InteractionServices';

export function Product({ product }) {
    const [imageError, setImageError] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertData, setAlertData] = useState({ type: 'success', message: '' });

    const user = useSelector((state) => state.user.value);
    console.log("user", user);
    const dispatch = useDispatch();

    function addToCart() {
        dispatch(addItem({ ...product, quantity: 1 }));
        showNotification('success', 'Producto agregado al carrito');
    }

    async function handleLike() {

        if (!user) {
            showNotification('error', 'Debes iniciar sesión para dar like');
            return;
        }


        try {

            if (!user.companyId || !user.departmentId) {
                showNotification('error', 'Debes tener un departamento y una empresa asignada');
                return;
            }

            const body = {
                "companyId": user.companyId,
                "departmentId": user.departmentId,
                "category": product.category,
                "likes": 1,
                "interactionsCounter": 0
            }

            console.log(body);

            const response = await postInteraction(body);

            if (response.status > 199 && response.status < 300) {
                showNotification('success', 'Like dado correctamente');
            }

        } catch (error) {
            showNotification('error', 'Error al darle like');
        }
    }

    const showNotification = (type, message) => {
        setAlertData({ type, message });
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };
    return (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative">
                {imageError ? (
                    <>
                        <div className='h-full w-full'>
                            <ImagePlacehoderSkeleton />
                        </div>
                    </>
                ) : (
                    <img
                        src={product.images.front}
                        alt={product.name}
                        className="h-full w-full object-cover"
                        onError={() => setImageError(true)}
                    />
                )}
                <Chip
                    value="Nuevo"
                    className="absolute top-8 right-8"
                    color="blue"
                />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
                <div>
                    <Typography variant="h2" color="blue-gray" className="mb-2">
                        {product.name}
                    </Typography>
                    <Typography variant="h4" color="blue" className="font-normal">
                        ${product.price}
                    </Typography>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product)
                        .filter(([key]) => !excludedProperties.includes(key))
                        .map(([key, value]) => (
                            <div key={key} className="space-y-1">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-medium"
                                >
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </Typography>
                                <Typography variant="paragraph" className="text-gray-700">
                                    {Array.isArray(value) ? value.join(', ') : value || 'N/A'}
                                </Typography>
                            </div>
                        ))}
                </div>

                <div className="flex gap-4">
                    <Button size="lg" className="flex items-center gap-2" onClick={addToCart}>
                        <ShoppingCartIcon strokeWidth={2} className="h-5 w-5" />
                        Agregar al Carrito
                    </Button>
                    <Button
                        size="lg"
                        variant="outlined"
                        className="flex items-center gap-2"
                        onClick={handleLike}
                    >
                        <HeartIcon strokeWidth={2} className="h-5 w-5" />
                        Favoritos
                    </Button>
                </div>
            </div>
            <MessageAlert showAlert={showAlert} alertData={alertData} />
        </div>
    );
}

export default Product;
