import { XMarkIcon } from "@heroicons/react/24/outline";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton,
    Input,
    Option,
    Select,
    Textarea,
    Typography,
} from "@material-tailwind/react";

export function EditProductPopUp({
    isEditOpen,
    setIsEditOpen,
    formData,
    handleInputChange,
    handleEdit,
    selectedProduct,
    categories
}) {
    const excludedProperties = [
        "id",
        "images",
        "price",
        "name",
        "category",
        "brand",
        "model",
        "description",
        "stock",
        "releaseDate",
        "warrantyPeriod",
        "specifications",
    ];

    return (
        <Dialog open={isEditOpen} handler={() => setIsEditOpen(false)} size="lg">
            <DialogHeader className="flex items-center justify-between">
                Editar Producto
                <IconButton
                    variant="text"
                    color="blue-gray"
                    onClick={() => setIsEditOpen(false)}
                >
                    <XMarkIcon className="h-5 w-5" />
                </IconButton>
            </DialogHeader>
            <DialogBody divider className="grid gap-4">
                {/* Mismo contenido que el diálogo de crear */}
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
                        value={(typeof formData.releaseDate === "number") ? formatDate(formData.releaseDate) : formData.releaseDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Stock"
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleInputChange}
                    />
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
                </div>
                <Input
                    label="Descripción"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
                <Typography variant="h6" color="blue-gray" className="mb-2">
                    Especificaciones
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProduct &&
                        Object.entries(selectedProduct)
                            .filter(([key]) => !excludedProperties.includes(key))
                            .map(([key, value]) => (
                                <Input
                                    key={key}
                                    label={key}
                                    value={formData[key]}
                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                />
                            ))}
                </div>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={() => setIsEditOpen(false)}
                    className="mr-1"
                >
                    Cancelar
                </Button>
                <Button onClick={handleEdit}>Guardar Cambios</Button>
            </DialogFooter>
        </Dialog>
    );
}

function formatDate(milliseconds) {
    const date = new Date(milliseconds);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son indexados desde 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}




export default EditProductPopUp;
