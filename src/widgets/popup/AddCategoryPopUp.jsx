import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";

export function AddCategoryPopUp({
    isCategoryDialogOpen,
    setIsCategoryDialogOpen,
    newCategoryName,
    setNewCategoryName,
    newCategoryDescription,
    setNewCategoryDescription,
    handleCreateCategory,
}) {
    return (
        <Dialog
            open={isCategoryDialogOpen}
            handler={() => setIsCategoryDialogOpen(false)}
            size="xs"
        >
            <DialogHeader>Nueva Categoría</DialogHeader>
            <DialogBody className="space-y-4">
                <Input
                    label="Nombre de la Categoría"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <Input
                    label="Descripcion de la Categoría"
                    value={newCategoryDescription}
                    onChange={(e) => setNewCategoryDescription(e.target.value)}
                />
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button
                    variant="text"
                    color="gray"
                    onClick={() => setIsCategoryDialogOpen(false)}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={handleCreateCategory}
                    disabled={!newCategoryName.trim()}
                >
                    Crear
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default AddCategoryPopUp;
