/* eslint-disable react/prop-types */
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
    Button,
    Card,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton,
    Input,
    Option,
    Select,
    Typography,
} from "@material-tailwind/react";
import { generateUploadURL } from "../../bucket/amazon";
import { useState } from "react";

export function AddProductPopUp({
    isCreateOpen,
    setIsCreateOpen,
    formData,
    handleInputChange,
    handleCreate,
    type,
    setType,
    categories,
}) {

    let specificProperties = {};

    switch (type) {
        case "laptop":
            specificProperties = {
                processor: "",
                ram: "",
                storageType: "",
                storageCapacity: "",
                graphicsCard: "",
                operatingSystem: "",
            };
            break;
        case "printer":
            specificProperties = {
                printingTechnology: "",
                connectivityOptions: "",
            };
            break;
        case "phone":
            specificProperties = {
                screenSize: "",
                batteryLife: "",
                cameraResolution: "",
                operatingSystem: "",
            };
            break;
        default:
            specificProperties = {};
    }

    // Estados para manejar las imágenes
    const getImageViews = () => {
        switch (type) {
            case "phone":
                return ["front", "back"];
            case "laptop":
            case "printer":
                return ["front", "side"];
            default:
                return ["front", "side"];
        }
    };

    // Función para obtener el texto de la vista
    const getViewText = (view) => {
        switch (view) {
            case "front":
                return "Front view";
            case "back":
                return "Back view";
            case "side":
                return "Side view";
            default:
                return "Vista";
        }
    };

    // Estados para manejar las imágenes
    const [selectedImages, setSelectedImages] = useState({
        front: null,
        side: null,
        back: null,
    });
    const [imagesPreviews, setImagesPreviews] = useState({
        front: null,
        side: null,
        back: null,
    });
    const [uploading, setUploading] = useState(false);

    // Inicializar estructura de imágenes según el tipo
    const initializeImagesForType = (productType) => {
        const views = productType === 'phone' ? ['front', 'back'] : ['front', 'side'];
        return views.reduce((acc, view) => ({
            ...acc,
            [view]: ''
        }), {});
    };

    // Reemplazar el Select de tipo existente con esta nueva versión
    const handleTypeChange = (value) => {
        setType(value);
        // Actualizar tipo de producto
        handleInputChange({
            target: {
                name: "productType",
                value
            }
        });

        // Reiniciar imágenes según el nuevo tipo
        handleInputChange({
            target: {
                name: "images",
                value: initializeImagesForType(value)
            }
        });

        // Limpiar previews y selecciones al cambiar tipo
        setSelectedImages({});
        setImagesPreviews({});
    };

    // Función para manejar la selección de imágenes
    const handleImageSelect = (e, view) => {
        const file = e.target.files[0];
        if (file) {
            // Actualizar la imagen seleccionada para esta vista
            setSelectedImages((prev) => ({
                ...prev,
                [view]: file,
            }));

            // Crear preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagesPreviews((prev) => ({
                    ...prev,
                    [view]: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    // Función para subir imágenes a S3
    const uploadToS3 = async () => {
        try {
            setUploading(true);
            const imageUrls = {};
            const views = getImageViews();

            // Crear array de promesas para subir todas las imágenes en paralelo
            const uploadPromises = views
                .filter(view => selectedImages[view]) // Solo procesar las imágenes seleccionadas
                .map(async (view) => {
                    try {
                        const uploadUrl = await generateUploadURL();

                        // Realizar la subida
                        await fetch(uploadUrl, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                            body: selectedImages[view],
                        });

                        // Almacenar la URL sin los parámetros de query
                        const finalUrl = uploadUrl.split("?")[0];
                        return { view, url: finalUrl };
                    } catch (error) {
                        console.error(`Error uploading ${view} image:`, error);
                        throw error;
                    }
                });

            // Esperar a que todas las subidas se completen
            const results = await Promise.all(uploadPromises);

            // Construir el objeto de URLs
            results.forEach(({ view, url }) => {
                imageUrls[view] = url;
            });

            // Mantener las URLs existentes si ya hay algunas
            const currentImages = formData.images || {};
            const updatedImages = {
                ...currentImages,
                ...imageUrls
            };

            // Actualizar formData con todas las URLs
            handleInputChange({
                target: {
                    name: "images",
                    value: updatedImages,
                },
            });
            console.log("Updated images:", updatedImages);
            return updatedImages;
        } catch (error) {
            console.error("Error uploading images:", error);
        } finally {
            setUploading(false);
        }
    };

    // Modificar handleCreate para incluir la subida de imágenes
    const handleCreateWithImages = async () => {
        if (selectedImages.front || selectedImages.side) {
            const data = await uploadToS3();
            const imagesToSend = {
                ...data
            }
            console.log("Data devuelta por el upload:", data);
            console.log("Images to send:", imagesToSend);
            handleCreate(imagesToSend);
            setSelectedImages({
                front: null,
                side: null,
                back: null,
            });
            // Limpiar el preview
            setImagesPreviews({
                front: null,
                side: null,
                back: null,
            });
        }

    };

    console.log("Selected images:", imagesPreviews);

    return (
        <Dialog
            className="h-[95vh] overflow-hidden flex flex-col"
            open={isCreateOpen}
            handler={() => setIsCreateOpen(false)}
            size="lg"
        >
            <DialogHeader className="flex items-center justify-between shrink-0">
                Crear Nuevo Producto
                <IconButton
                    variant="text"
                    color="blue-gray"
                    onClick={() => setIsCreateOpen(false)}
                >
                    <XMarkIcon className="h-5 w-5" />
                </IconButton>
            </DialogHeader>
            <DialogBody divider className="grid gap-4 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Nombre del Producto"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="Marca del Producto"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Modelo del Producto"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="Precio"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Periodo de Garantía (Meses)"
                        name="warrantyPeriod"
                        type="number"
                        value={formData.warrantyPeriod}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="Fecha de lanzamiento"
                        name="releaseDate"
                        type="date"
                        value={formData.releaseDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                        label="Tipo"
                        value={type}
                        // onChange={(value) => {
                        //     setType(value);
                        //     handleInputChange({ target: { name: "productType", value } });
                        // }}
                        onChange={handleTypeChange}
                    >
                        <Option value="phone">Phone</Option>
                        <Option value="printer">Printer</Option>
                        <Option value="laptop">Laptop</Option>
                    </Select>
                    <Input
                        label="Stock"
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                        label="Categoria"
                        value={formData.category}
                        onChange={(value) =>
                            handleInputChange({ target: { name: "category", value } })
                        }
                    >
                        {categories &&
                            categories.map((category) => (
                                <Option key={category.name} value={category.name}>
                                    {category.name}
                                </Option>
                            ))}
                    </Select>
                    <Input
                        label="Descripción"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                    Especificaciones
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(specificProperties).map((key) => (
                        <Input
                            key={key}
                            label={key}
                            value={formData[key]}
                            onChange={(e) =>
                                handleInputChange({
                                    target: { name: key, value: e.target.value },
                                })
                            }
                        />
                    ))}
                </div>
                {/* Sección de carga de imágenes */}
                <Typography variant="h6" color="blue-gray" className="mb-2">
                    Imágenes del Producto
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getImageViews().map((view, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                            <Typography variant="small" color="blue-gray" className="font-medium">
                                {getViewText(view)}
                            </Typography>
                            <Card className="h-48 w-full relative">
                                <div className="absolute inset-0">
                                    {imagesPreviews[view] ? (
                                        <div className="relative w-full h-full">
                                            <img
                                                src={imagesPreviews[view]}
                                                alt={getViewText(view)}
                                                className="w-full h-full object-cover"
                                            />
                                            <div
                                                className="absolute top-2 right-2 z-50 bg-red-50 rounded-full cursor-pointer hover:bg-red-100"
                                                onClick={() => {
                                                    console.log("Clearing image for", view);
                                                    setSelectedImages(prev => ({
                                                        ...prev,
                                                        [view]: null
                                                    }));
                                                    setImagesPreviews(prev => ({
                                                        ...prev,
                                                        [view]: null
                                                    }));
                                                    const currentImages = { ...formData.images };
                                                    currentImages[view] = '';
                                                    handleInputChange({
                                                        target: {
                                                            name: "images",
                                                            value: currentImages,
                                                        }
                                                    });
                                                }}
                                            >
                                                <XMarkIcon className="h-5 w-5 text-red-500 m-1" />
                                            </div>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-lg">
                                            <PhotoIcon className="h-12 w-12 text-gray-400" />
                                            <Typography variant="small" className="mt-2">
                                                {getViewText(view)}
                                            </Typography>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => handleImageSelect(e, view)}
                                            />
                                        </label>
                                    )}
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </DialogBody>
            <DialogFooter className="shrink-0">
                <Button
                    variant="text"
                    color="red"
                    onClick={() => {

                        setSelectedImages({
                            front: null,
                            side: null,
                            back: null,
                        });
                        // Limpiar el preview
                        setImagesPreviews({
                            front: null,
                            side: null,
                            back: null,
                        });
                        setIsCreateOpen(false)
                    }
                    }
                    className="mr-1"
                >
                    Cancelar
                </Button>
                <Button onClick={handleCreateWithImages} disabled={uploading}>
                    {uploading ? "Subiendo..." : "Crear Producto"}
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default AddProductPopUp;
