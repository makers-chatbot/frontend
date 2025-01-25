import { useEffect, useState } from "react";
import {
    Typography,
    Button,
    IconButton,
    Input,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Select,
    Option,
    Tooltip,
} from "@material-tailwind/react";
import {
    PlusIcon,
    PencilSquareIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    createContract,
    getContracts,
    updateContract,
} from "../../services/ContractServices";
import { useSelector } from "react-redux";
import { MessageAlert } from "../../widgets/alerts";
import { useNavigate } from "react-router-dom";

export function RentalContracts() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertData, setAlertData] = useState({ type: "", message: "" });
    const [selectedContract, setSelectedContract] = useState(null);
    const [contracts, setContracts] = useState([]);
    const [refetch, setRefetch] = useState(false);

    const user = useSelector((state) => state.user.value);
    console.log("user ", user);

    const navigate = useNavigate();



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
        if (!sessionStorage.getItem("token")) {
            navigate("/auth/sign-in");
        }

        if (sessionStorage.getItem("token")) {
            fetchContracts();
        }

    }, [refetch, user, navigate]);

    // Convertir timestamp a formato YYYY-MM-DD para input date
    const formatDateForInput = (timestamp) => {
        return new Date(timestamp).toISOString().split("T")[0];
    };

    // Convertir YYYY-MM-DD a timestamp
    const formatDateToTimestamp = (dateString) => {
        return new Date(dateString).getTime();
    };

    // Formatear fecha para mostrar
    const formatDateToDisplay = (timestamp) => {
        return new Date(timestamp).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
        monthlyCost: "",
        departmentId: 0,
        accepted: null,
        isClosed: null,
    });

    const handleCreateOpen = () => {
        setFormData({
            startDate: "",
            endDate: "",
            monthlyCost: "",
            departmentId: 0,
        });
        setIsCreateOpen(true);
    };

    const handleEditOpen = (contract) => {
        setSelectedContract(contract);
        setFormData({
            startDate: formatDateForInput(contract.startDate),
            endDate: formatDateForInput(contract.endDate),
            monthlyCost: contract.monthlyCost,
            departmentId: contract.departmentId,
            accepted: contract.accepted,
            isClosed: contract.isClosed,
        });
        setIsEditOpen(true);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // console.log("Name: ", name);
        // console.log("Value: ", value);
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreate = async () => {
        const newContract = {
            startDate: formatDateToTimestamp(formData.startDate),
            endDate: formatDateToTimestamp(formData.endDate),
            monthlyCost: parseFloat(formData.monthlyCost),
            departmentId: user.departmentId,
        };

        try {
            const response = await createContract(newContract);
            if (response.status === 200) {
                setRefetch((prev) => !prev);
                setIsCreateOpen(false);
                showNotification("success", "Contrato creado exitosamente");
            }
        } catch (error) {
            console.log(error);
            setIsCreateOpen(false);
            showNotification("error", "Error al crear el contrato");
        }
    };

    const handleEdit = async () => {
        const newContract = {
            ...selectedContract,
            startDate: formatDateToTimestamp(formData.startDate),
            endDate: formatDateToTimestamp(formData.endDate),
            monthlyCost: parseFloat(formData.monthlyCost),
            departmentId: user.departmentId,
            accepted: Boolean(formData.accepted),
            isClosed: Boolean(formData.isClosed),
        };

        console.log("newContract: ", newContract);

        try {
            const response = await updateContract(newContract.id, newContract);
            if (response.status === 200) {
                setRefetch((prev) => !prev);
                setIsEditOpen(false);
                showNotification("success", "Contrato editado exitosamente");
            }
        } catch (error) {
            console.log(error);
            setIsEditOpen(false);
            showNotification("error", "Error al crear el contrato");
        }
    };


    const showNotification = (type, message) => {
        setAlertData({ type, message });
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <Typography variant="h4" color="blue-gray">
                    Gestión de Contratos de Alquiler
                </Typography>
                <Button className="flex items-center gap-2" onClick={handleCreateOpen}>
                    <PlusIcon className="h-5 w-5" />
                    Nuevo Contrato
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contracts.map((contract) => (
                    <Card key={contract.id} className="overflow-hidden">
                        <CardHeader floated={false} className="h-36">
                            <img
                                src="https://i.pinimg.com/564x/b6/eb/86/b6eb86c1b83431c8064d5687d58ea25a.jpg"
                                alt="contract"
                                className="w-full h-full object-cover"
                            />
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                Contrato
                            </Typography>
                            <Typography variant="h6" color="blue-gray" className="mb-2">
                                #{contract.contractNumber}
                            </Typography>
                            <div className="space-y-2">
                                <Typography variant="small" color="gray">
                                    Período de Alquiler
                                </Typography>
                                <Typography variant="small" color="blue-gray">
                                    {formatDateToDisplay(contract.startDate)} -{" "}
                                    {formatDateToDisplay(contract.endDate)}
                                </Typography>
                                <Typography variant="h6" color="blue" className="mt-2">
                                    ${contract.monthlyCost.toFixed(2)}/mes
                                </Typography>
                            </div>
                        </CardBody>
                        <CardFooter className="pt-0 flex justify-between">
                            {
                                user.rolesNames.includes("ADMIN") && (

                                    <Tooltip content="Editar Contrato">
                                        <IconButton
                                            variant="text"
                                            color="blue"
                                            onClick={() => handleEditOpen(contract)}
                                        >
                                            <PencilSquareIcon className="h-5 w-5" />
                                        </IconButton>
                                    </Tooltip>
                                )
                            }
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Create/Edit Dialog */}
            <Dialog
                open={isCreateOpen || isEditOpen}
                handler={() =>
                    isCreateOpen ? setIsCreateOpen(false) : setIsEditOpen(false)
                }
                size="lg"
            >
                <DialogHeader className="flex items-center justify-between">
                    {isCreateOpen ? "Crear Nuevo Contrato" : "Editar Contrato"}
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() =>
                            isCreateOpen ? setIsCreateOpen(false) : setIsEditOpen(false)
                        }
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </IconButton>
                </DialogHeader>
                <DialogBody divider className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Fecha de Inicio"
                            name="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={handleInputChange}
                        />
                        <Input
                            label="Fecha de Fin"
                            name="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <Input
                        label="Costo Mensual"
                        name="monthlyCost"
                        type="number"
                        step="0.01"
                        value={formData.monthlyCost}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="ID del Departamento"
                        name="departmentId"
                        type="number"
                        value={formData.departmentId}
                        onChange={handleInputChange}
                    />
                    {
                        isEditOpen && (
                            <>

                                <Select
                                    label="Estado de aceptacion"
                                    value={String(formData.accepted)}
                                    onChange={(value) =>
                                        handleInputChange({
                                            target: {
                                                name: "accepted",
                                                value
                                            },
                                        })
                                    }
                                >
                                    <Option value={"true"}> Aceptar </Option>
                                    <Option value={"false"}> Rechazar </Option>
                                </Select>
                                <Select
                                    label="Estado del contrato"
                                    value={String(formData.isClosed)}
                                    onChange={(value) =>
                                        handleInputChange({
                                            target: {
                                                name: "isClosed",
                                                value
                                            },
                                        })
                                    }
                                >
                                    <Option value={"true"}> Cerrado </Option>
                                    <Option value={"false"}> Abierto </Option>
                                </Select>
                            </>
                        )
                    }
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() =>
                            isCreateOpen ? setIsCreateOpen(false) : setIsEditOpen(false)
                        }
                        className="mr-1"
                    >
                        Cancelar
                    </Button>
                    <Button onClick={isCreateOpen ? handleCreate : handleEdit}>
                        {isCreateOpen ? "Crear Contrato" : "Guardar Cambios"}
                    </Button>
                </DialogFooter>
            </Dialog>


            {/* Alert */}
            <MessageAlert alertData={alertData} showAlert={showAlert} />
        </div>
    );
}

export default RentalContracts;
