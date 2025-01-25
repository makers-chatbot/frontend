import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react"

export function DeleteProductPopUp({ isDeleteOpen, setIsDeleteOpen, handleDelete, selectedProduct }) {
    return (
        <Dialog open={isDeleteOpen} handler={() => setIsDeleteOpen(false)}>
            <DialogHeader className="flex items-center">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-2" />
                Confirmar Eliminación
            </DialogHeader>
            <DialogBody divider>
                ¿Estás seguro de que deseas eliminar el producto
                &quot; {selectedProduct?.name} &quot;? Esta acción no se puede deshacer.
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="blue-gray"
                    onClick={() => setIsDeleteOpen(false)}
                    className="mr-1"
                >
                    Cancelar
                </Button>
                <Button variant="filled" color="red" onClick={handleDelete}>
                    Eliminar
                </Button>
            </DialogFooter>
        </Dialog>
    )
}

export default DeleteProductPopUp
