import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import {
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";


export function DeleteCategoryPopUp({ isDeleteCategoryOpen, setIsDeleteCategoryOpen, handleDeleteCategory, selectedCategory }) {
    return (
        <Dialog
            open={isDeleteCategoryOpen}
            handler={() => setIsDeleteCategoryOpen(false)}
        >
            <DialogHeader className="flex items-center">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-2" />
                Eliminar Categoría
            </DialogHeader>
            <DialogBody divider>
                ¿Estás seguro de que deseas eliminar la categoría &quot;{selectedCategory?.name}&quot;?
                Esta acción no se puede deshacer y podría afectar a los productos asociados.
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="gray"
                    onClick={() => setIsDeleteCategoryOpen(false)}
                    className="mr-1"
                >
                    Cancelar
                </Button>
                <Button
                    variant="filled"
                    color="red"
                    onClick={handleDeleteCategory}
                >
                    Eliminar
                </Button>
            </DialogFooter>
        </Dialog>
    )
}

export default DeleteCategoryPopUp
