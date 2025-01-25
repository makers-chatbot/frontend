import React, { useEffect, useState } from 'react';
import {
    Typography,
    Button,
    IconButton,
    Breadcrumbs,
    Input,
    Card,
    CardBody,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Tooltip,
    Select,
    Option,
    Textarea,
    MenuItem,
    MenuList,
    MenuHandler,
    Menu
} from "@material-tailwind/react";


import {
    HeartIcon,
    TrashIcon,
    PlusIcon,
    MinusIcon,
    XMarkIcon,
    UserCircleIcon,
    ShoppingBagIcon,
    Bars3Icon,
    ChevronDownIcon
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { excludedProperties } from '../../data';
import { ImagePlacehoderSkeleton } from '../../widgets/skeleton';
import { removeItem, updateQuantity } from '../../redux/features/cartSlice';
import { getContracts } from '../../services/ContractServices';
import { MessageAlert } from '../../widgets/alerts';
import { createDeliveryCertificate } from '../../services/DeliveryCertificateServices';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { logout } from '../../redux/features/userSlice';

export function CartAndFavorites() {
    const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false);
    const [imageError, setImageError] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [alertData, setAlertData] = useState({ type: '', message: '' });
    const [showAlert, setShowAlert] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const cart = useSelector((state) => state.cart.items);

    console.log("user ", user);
    console.log("cart ", cart);

    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("roles");
        dispatch(logout());
        navigate('/');
    };

    // UseEffect to fetch contracts

    useEffect(() => {
        async function fetchContracts() {
            const response = await getContracts();

            if (response.status === 200) {
                if (!user.rolesNames.includes("ADMIN")) {
                    setContracts(response.data.filter((contract) => contract.departmentId === user.departmentId));
                } else {
                    setContracts(response.data);
                }
            } else {
                showNotification("error", "Error al cargar los contratos");
            }
        }
        fetchContracts();
    }, [user]);

    const updateStock = (id, change) => {
        console.log(id, change);
        const quantity = cart.find(item => item.id === id).quantity + change
        if (quantity < 1) {
            removeFromCart(id);
            return;
        }
        dispatch(updateQuantity({ id, quantity }));
    };

    const removeFromCart = (id) => {
        dispatch(removeItem(cart.find(item => item.id === id)));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const showNotification = (type, message) => {
        setAlertData({ type, message });
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    // --------------------------- Delivery States ---------------------------

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [deliveryForm, setDeliveryForm] = useState({
        notes: '',
        quantity: 1,
        contractId: '',
    });

    const handleDeliveryInputChange = (e) => {
        const { name, value } = e.target;
        setDeliveryForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProductSelection = (productId) => {
        const product = cart.find(item => item.id === productId);
        setSelectedProduct(product);
        setDeliveryForm(prev => ({
            ...prev,
            quantity: product.quantity,
        }));
    };

    const handleCreateDeliveryCertificate = async () => {
        if (!selectedProduct || !deliveryForm.contractId || !deliveryForm.notes) {
            showNotification('error', 'Por favor complete todos los campos requeridos');
            return;
        }

        try {
            const certificateData = {
                notes: deliveryForm.notes,
                quantity: parseInt(deliveryForm.quantity),
                equipmentId: selectedProduct.id,
                contractId: parseInt(deliveryForm.contractId),
                deliveryDate: new Date().getTime(),
            };


            const response = await createDeliveryCertificate(certificateData);

            if (response.status !== 200) {
                showNotification('error', 'Error al crear el certificado de entrega');
                return;
            }

            removeFromCart(selectedProduct.id);
            showNotification('success', 'Certificado de entrega creado exitosamente');
            setIsCheckoutDialogOpen(false);

            // Resetear el formulario
            setSelectedProduct(null);
            setDeliveryForm({
                notes: '',
                quantity: 1,
                contractId: '',
            });
        } catch (error) {
            console.log(error);
            showNotification('error', 'Error al crear el certificado de entrega');
        }
    };

    const renderCheckoutDialog = () => (
        <Dialog
            open={isCheckoutDialogOpen}
            handler={() => setIsCheckoutDialogOpen(false)}
            className="max-w-md mx-auto"
        >
            <DialogHeader className="text-2xl font-bold text-gray-800">
                Crear Certificado de Entrega
            </DialogHeader>
            <DialogBody divider className="grid gap-4 p-6">
                <div className="space-y-4">
                    <div className="mb-4 space-y-4">
                        <Typography variant="small" color="blue-gray" className="font-medium mb-2">
                            Seleccionar Producto
                        </Typography>
                        <Select
                            label="Contrato"
                            value={String(deliveryForm.contractId)}
                            onChange={(id) => handleDeliveryInputChange({ target: { name: 'contractId', value: String(id) } })}
                        >
                            {contracts.map((contract) => (
                                <Option key={contract.id} value={String(contract.id)}>
                                    {contract.contractNumber}
                                </Option>
                            ))}
                        </Select>
                        <Select
                            label="Producto"
                            value={selectedProduct?.id || ''}
                            onChange={(id) => handleProductSelection(id)}
                        >
                            {cart.map((item) => (
                                <Option key={item.id} value={item.id}>
                                    {item.name} - Cantidad: {item.quantity}
                                </Option>
                            ))}
                        </Select>
                    </div>

                    {selectedProduct && (
                        <>
                            <Input
                                type="number"
                                label="Cantidad a entregar"
                                name="quantity"
                                value={deliveryForm.quantity}
                                onChange={handleDeliveryInputChange}
                                min={1}
                                max={selectedProduct.quantity}
                            />

                            <Textarea
                                label="Notas de entrega"
                                name="notes"
                                value={deliveryForm.notes}
                                onChange={handleDeliveryInputChange}
                                rows={4}
                            />
                        </>
                    )}
                </div>
            </DialogBody>
            <DialogFooter className="p-4 space-x-2">
                <Button
                    variant="text"
                    color="red"
                    onClick={() => {
                        setIsCheckoutDialogOpen(false);
                        setSelectedProduct(null);
                        setDeliveryForm({
                            notes: '',
                            quantity: 1,
                            contractId: '',
                        });
                    }}
                    className="hover:bg-red-50"
                >
                    Cancelar
                </Button>
                <Button
                    onClick={handleCreateDeliveryCertificate}
                    disabled={!selectedProduct || !deliveryForm.contractId || !deliveryForm.notes}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Crear Certificado
                </Button>
            </DialogFooter>
        </Dialog>
    );


    return (
        <div className="min-h-screen w-full bg-gray-50">
            <main className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="max-w-6xl mx-auto mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <Breadcrumbs className="bg-transparent p-0">
                            <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                                Inicio
                            </Link>
                            <Link to="" className="text-gray-600">
                                Carrito de Compras
                            </Link>
                        </Breadcrumbs>

                        <Menu placement="bottom-end">
                            <MenuHandler>
                                <Button
                                    variant="text"
                                    className="flex items-center gap-2 normal-case text-blue-gray-800"
                                >
                                    <UserCircleIcon className="h-5 w-5" />
                                    <Typography className="font-medium">
                                        {user?.name || 'Usuario'}
                                    </Typography>
                                    <ChevronDownIcon className="h-4 w-4" />
                                </Button>
                            </MenuHandler>
                            <MenuList>
                                <MenuItem
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-red-500 hover:bg-red-50/80"
                                >
                                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                                    Cerrar Sesión
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </div>

                    <div className="flex items-center justify-between">
                        <Typography variant="h3" className="text-gray-800 font-bold">
                            Mi Carrito
                        </Typography>
                        <div className="bg-blue-50 px-4 py-2 rounded-full">
                            <Typography className="text-blue-800 font-medium">
                                {cart.length} {cart.length === 1 ? 'Producto' : 'Productos'}
                            </Typography>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto">
                    {cart && cart.length > 0 ? (
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Cart Items Section */}
                            <div className="flex-grow space-y-4">
                                {cart.map((item) => (
                                    <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300">
                                        <CardBody className="flex flex-col md:flex-row items-center gap-6 p-6">
                                            {/* Imagen */}
                                            <div className="w-full md:w-48 min-w-[200px]">
                                                {(imageError && imageError.includes(item.id)) ? (
                                                    <ImagePlacehoderSkeleton />
                                                ) : (
                                                    <img
                                                        src={item.images.front}
                                                        alt={item.name}
                                                        className="w-full h-48 object-cover rounded-xl shadow-sm"
                                                        onError={() => setImageError(prev => [...prev, item.id])}
                                                    />
                                                )}
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-start">
                                                    <div className="space-y-3">
                                                        <Typography variant="h5" className="text-gray-900 font-semibold">
                                                            {item.name}
                                                        </Typography>
                                                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                                                            {Object.entries(item)
                                                                .filter(([key]) => ![...excludedProperties, "quantity"].includes(key))
                                                                .map(([key, value]) => (
                                                                    <div key={key} className="flex items-center gap-2">
                                                                        <Typography variant="small" className="text-gray-600 font-medium">
                                                                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                                                                        </Typography>
                                                                        <Typography variant="small" className="text-gray-800">
                                                                            {Array.isArray(value) ? value.join(', ') : value || 'N/A'}
                                                                        </Typography>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    </div>

                                                    <Tooltip content="Eliminar">
                                                        <IconButton
                                                            variant="text"
                                                            color="red"
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="hover:bg-red-50"
                                                        >
                                                            <TrashIcon className="h-5 w-5" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>

                                                {/* Quantity and Price */}
                                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                                    <div className="flex items-center gap-2">
                                                        <IconButton
                                                            variant="outlined"
                                                            size="sm"
                                                            onClick={() => updateStock(item.id, -1)}
                                                            className="rounded-full"
                                                        >
                                                            <MinusIcon className="h-4 w-4" />
                                                        </IconButton>
                                                        <Typography className="w-12 text-center font-medium">
                                                            {item.quantity}
                                                        </Typography>
                                                        <IconButton
                                                            variant="outlined"
                                                            size="sm"
                                                            disabled={item.quantity >= item.stock}
                                                            onClick={() => updateStock(item.id, 1)}
                                                            className="rounded-full"
                                                        >
                                                            <PlusIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </div>
                                                    <Typography variant="h6" className="text-blue-600 font-bold">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>

                            {/* Order Summary Card */}
                            <div className="lg:w-80">
                                <Card className="sticky top-4">
                                    <CardBody className="p-6 space-y-6">
                                        <Typography variant="h6" className="text-gray-700 font-bold">
                                            Resumen del Pedido
                                        </Typography>

                                        <div className="space-y-3">
                                            <div className="flex justify-between text-gray-600">
                                                <span>Subtotal</span>
                                                <span>${calculateTotal().toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-600">
                                                <span>Envío</span>
                                                <span>Gratis</span>
                                            </div>
                                            <div className="pt-3 border-t border-gray-200">
                                                <div className="flex justify-between items-center">
                                                    <Typography variant="h6">Total</Typography>
                                                    <Typography variant="h4" className="text-blue-600 font-bold">
                                                        ${calculateTotal().toFixed(2)}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            size="lg"
                                            onClick={() => setIsCheckoutDialogOpen(true)}
                                            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-3 text-lg"
                                        >
                                            Proceder al Pago
                                        </Button>

                                        <div className="text-center">
                                            <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm">
                                                Continuar comprando
                                            </Link>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    ) : (
                        <Card className="max-w-2xl mx-auto">
                            <CardBody className="text-center py-16">
                                <ShoppingBagIcon className="h-20 w-20 mx-auto text-blue-gray-300 mb-6" />
                                <Typography variant="h4" className="text-gray-700 mb-4">
                                    Tu carrito está vacío
                                </Typography>
                                <Typography className="text-gray-500 mb-8">
                                    Parece que aún no has añadido ningún producto a tu carrito.
                                </Typography>
                                <Link to="/">
                                    <Button
                                        variant="outlined"
                                        className="px-8 py-2 text-blue-600 border-blue-600 hover:bg-blue-50"
                                    >
                                        Explorar Productos
                                    </Button>
                                </Link>
                            </CardBody>
                        </Card>
                    )}
                </div>
            </main>

            {/* Checkout Dialog */}
            {renderCheckoutDialog()}
            <MessageAlert alertData={alertData} showAlert={showAlert} />
        </div>
    );
}