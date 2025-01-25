import { useEffect, useState } from "react";
import {
    Button,
    Alert,
    IconButton,
    Typography,
    Card,
    CardBody,
    CardFooter,
    Chip,
    CardHeader,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    ExclamationTriangleIcon,
    TagIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { AddCategoryPopUp, AddProductPopUp, DeleteCategoryPopUp, DeleteProductPopUp, EditProductPopUp } from "../../widgets/popup";
import { createCategory, deleteCategory, getCategories } from "../../services";
import { createProduct, deleteProduct, editProduct, getProducts } from "../../services/ProductServices";
import { images } from "../../data";
import { ImagePlacehoderSkeleton } from "../../widgets/skeleton";
import { useNavigate } from "react-router-dom";
import { generateUploadURL } from "../../bucket/amazon";

export function ProductManagement() {
    // Estados para los diálogos
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [type, setType] = useState("laptop");
    const [category, setCategory] = useState("");
    const [alertData, setAlertData] = useState({ type: "", message: "" });
    const [imageError, setImageError] = useState([]);


    // Estados para la lista de productos y categorias y su fetch
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);

    // Estados para las categorias
    const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
    const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryDescription, setNewCategoryDescription] = useState("");

    // Manejadores para categorías
    const handleCreateCategory = async () => {
        if (!newCategoryName.trim()) {
            showNotification("error", "El nombre de la categoría es requerido");
            return;
        }

        try {
            const response = await createCategory({ name: newCategoryName, description: newCategoryDescription });
            if (response.status === 200) {
                setRefresh(ref => !ref);
                setIsCategoryDialogOpen(false);
                setNewCategoryName("");
                setNewCategoryDescription("");
                showNotification("success", "Categoría creada exitosamente");
            }
        } catch (error) {
            showNotification("error", "Error al crear la categoría");
        }
    };

    const handleDeleteCategory = async () => {
        try {
            const response = await deleteCategory(selectedCategory.id);
            if (response.status === 200) {
                setRefresh(ref => !ref);
                setIsDeleteCategoryOpen(false);
                showNotification("success", "Categoría eliminada exitosamente");
            }
        } catch (error) {
            showNotification("error", "Error al eliminar la categoría");
        }
    };

    // Estado para el producto seleccionado
    const [selectedProduct, setSelectedProduct] = useState(null);


    // Estado para el formulario
    const [formData, setFormData] = useState({ "productType": type });

    const navigate = useNavigate();
    if (!sessionStorage.getItem("roles") || !sessionStorage.getItem("roles").includes("ADMIN")) {
        navigate("/products");
    }


    // Manejadores para los diálogos
    const handleCreateOpen = () => {
        setFormData({});
        setIsCreateOpen(true);
    };

    const handleEditOpen = (product) => {
        setSelectedProduct(product);
        setFormData(product);
        setIsEditOpen(true);
    };

    const handleDeleteOpen = (product) => {
        setSelectedProduct(product);
        setIsDeleteOpen(true);
    };

    // Manejadores para el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Funciones para las operaciones CRUD
    const handleCreate = async (imagesToSend) => {

        if (formData?.connectivityOptions) {
            formData.connectivityOptions = formData.connectivityOptions.split(",");
        }

        console.log("Form data", formData);

        const newProduct = {
            ...formData,
            images: imagesToSend,
            productType: type,
            releaseDate: new Date(formData.releaseDate).getTime(),
        };
        console.log("New product", newProduct);

        try {
            const response = await createProduct(newProduct);

            if (response.status === 200) {
                setRefresh(ref => !ref);
                setIsCreateOpen(false);
                showNotification("success", "Producto creado exitosamente");
            }

        } catch (error) {
            console.log("Error", error);
            showNotification("error", "Error al crear el producto");

        }

    };

    const handleEdit = async () => {
        if (formData?.connectivityOptions) {
            formData.connectivityOptions = formData.connectivityOptions.split(",");
        }
        const updatedProduct = {
            ...formData,
            releaseDate: new Date(formData.releaseDate).getTime(),
        };

        console.log("Updated product", updatedProduct);
        try {

            const response = await editProduct(updatedProduct.id, updatedProduct);

            if (response.status === 200) {
                setRefresh(ref => !ref);
                setIsEditOpen(false);
                showNotification("success", "Producto actualizado exitosamente");
            }
        } catch (error) {
            console.log("Error", error);
            showNotification("error", "Error al editar el producto");
        }

    };

    const handleDelete = async () => {


        try {
            const response = await deleteProduct(selectedProduct.id);
            if (response.status === 200) {
                setRefresh(ref => !ref);
                setIsDeleteOpen(false);
                showNotification("success", "Producto eliminado exitosamente");
            }
        } catch (error) {
            console.log("Error", error);
            setIsDeleteOpen(false);
            showNotification("error", "Error al eliminar el producto");
        }


    };

    // Función para mostrar notificaciones
    const showNotification = (type, message) => {
        setAlertData({ type, message });
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const categoriesResponse = await getCategories();
                setCategories(categoriesResponse.data);
                const productsResponse = await getProducts();
                setProducts(productsResponse.data);
            } catch (err) {
                setError("Error al cargar las categorías");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [refresh]);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Botón para crear nuevo producto */}
            <div className="flex justify-between items-center mb-6">
                <Typography variant="h4" color="blue-gray">
                    Gestión de Productos
                </Typography>
                <div className="flex items-center gap-4">
                    <Menu placement="bottom-end">
                        <MenuHandler>
                            <Button
                                variant="outlined"
                                className="flex items-center gap-2"
                            >
                                <TagIcon className="h-5 w-5" />
                                Categorías
                                <ChevronDownIcon className="h-4 w-4" />
                            </Button>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem
                                onClick={() => setIsCategoryDialogOpen(true)}
                                className="flex items-center gap-2"
                            >
                                <PlusIcon className="h-4 w-4" />
                                Nueva Categoría
                            </MenuItem>
                            <hr className="my-2" />
                            {categories.map((cat) => (
                                <MenuItem
                                    key={cat.id}
                                    className="flex items-center justify-between"
                                >
                                    <span>{cat.name}</span>
                                    <IconButton
                                        variant="text"
                                        color="red"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedCategory(cat);
                                            setIsDeleteCategoryOpen(true);
                                        }}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </IconButton>
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Button
                        className="flex items-center gap-2"
                        onClick={handleCreateOpen}
                    >
                        <PlusIcon className="h-5 w-5" />
                        Nuevo Producto
                    </Button>
                </div>
            </div>

            {/* Lista de productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden flex flex-col items-center">
                        <CardHeader color="white" className="h-[80%] w-[80%] mt-4">
                            {(imageError && imageError.includes(product.id)) ? (
                                <>
                                    <div className='w-full h-full object-cover rounded-lg'>
                                        <ImagePlacehoderSkeleton />
                                    </div>
                                </>
                            ) : (
                                <img
                                    src={product.images.front}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-lg"
                                    onError={() => setImageError(prev => [...prev, product.id])}
                                />
                            )}
                            <Chip
                                value={product.stock > 0 ? "En Stock" : "Sin Stock"}
                                color={product.stock > 0 ? "green" : "red"}
                                className="absolute top-2 right-2"
                            />
                        </CardHeader>
                        <CardBody className="flex flex-row w-full items-start">
                            <div className="mt-4 flex flex-col">
                                <Typography variant="h6" color="blue-gray">
                                    {product.name}
                                </Typography>
                                <Typography variant="small" color="gray">
                                    Stock: {product.stock} unidades
                                </Typography>
                                <Typography variant="h6" color="blue">
                                    ${product.price}
                                </Typography>
                            </div>
                        </CardBody>
                        <CardFooter className="pt-0 flex w-full justify-between">
                            <IconButton
                                variant="text"
                                color="blue"
                                onClick={() => handleEditOpen(product)}
                            >
                                <PencilSquareIcon className="h-5 w-5" />
                            </IconButton>
                            <IconButton
                                variant="text"
                                color="red"
                                onClick={() => handleDeleteOpen(product)}
                            >
                                <TrashIcon className="h-5 w-5" />
                            </IconButton>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Diálogo de Crear Producto */}
            <AddProductPopUp
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
                formData={formData}
                handleInputChange={handleInputChange}
                handleCreate={handleCreate}
                type={type}
                setType={setType}
                categories={categories}
            />

            {/* Diálogo de Editar Producto */}
            {selectedProduct && (
                <EditProductPopUp
                    isEditOpen={isEditOpen}
                    setIsEditOpen={setIsEditOpen}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleEdit={handleEdit}
                    selectedProduct={selectedProduct}
                    categories={categories}
                />
            )}

            {/* Diálogo de Eliminar Producto */}
            <DeleteProductPopUp
                isDeleteOpen={isDeleteOpen}
                setIsDeleteOpen={setIsDeleteOpen}
                handleDelete={handleDelete}
                selectedProduct={selectedProduct}
            />

            {/* Diálogo de Crear Categoría */}
            <AddCategoryPopUp
                isCategoryDialogOpen={isCategoryDialogOpen}
                setIsCategoryDialogOpen={setIsCategoryDialogOpen}
                newCategoryName={newCategoryName}
                setNewCategoryName={setNewCategoryName}
                newCategoryDescription={newCategoryDescription}
                setNewCategoryDescription={setNewCategoryDescription}
                handleCreateCategory={handleCreateCategory}
            />

            {/* Diálogo de Eliminar Categoría */}
            <DeleteCategoryPopUp
                isDeleteCategoryOpen={isDeleteCategoryOpen}
                setIsDeleteCategoryOpen={setIsDeleteCategoryOpen}
                handleDeleteCategory={handleDeleteCategory}
                selectedCategory={selectedCategory}
            />

            {/* Alerta de notificación */}
            {showAlert && (
                <div className="fixed bottom-4 right-4 z-50">
                    <Alert
                        color={alertData.type === "success" ? "green" : "red"}
                        className="max-w-screen-md"
                        icon={
                            alertData.type === "success" ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <ExclamationTriangleIcon className="h-6 w-6" />
                            )
                        }
                    >
                        {alertData.message}
                    </Alert>
                </div>
            )}
        </div>
    );
}

export default ProductManagement;
