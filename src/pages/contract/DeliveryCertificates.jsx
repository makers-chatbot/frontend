import React, { useEffect, useState } from 'react';
import {
    Card,
    CardBody,
    Typography,
    Button,
    Chip,
    Tooltip,
    IconButton,
    Breadcrumbs,
} from "@material-tailwind/react";
import {
    DocumentTextIcon,
    ClipboardDocumentListIcon,
    CalendarDaysIcon,
    TagIcon,
    ArrowTopRightOnSquareIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from 'react-router-dom';
import { getDeliveryCertificates } from '../../services/DeliveryCertificateServices';
import { getContracts } from '../../services/ContractServices';
import { useSelector } from 'react-redux';
import { ErrorBlock } from '../../widgets/blocks';

export function DeliveryCertificates() {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.value);


    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                setLoading(true);
                const responseContracts = await getContracts();
                var contracts = [];
                if (responseContracts.status === 200) {
                    if (!user.rolesNames.includes("ADMIN")) {
                        contracts = (responseContracts.data.filter((contract) => contract.departmentId === user.departmentId).map((contract) => contract.id));
                    } else {
                        contracts = (responseContracts.data.map((contract) => contract.id));
                    }
                }

                const response = await getDeliveryCertificates();
                if (response.status === 200) {
                    setCertificates(response.data.filter((certificate) => contracts.includes(certificate.contractId)));
                }
            } catch (err) {
                setError('Error al cargar los certificados');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCertificates();
    }, [user]);

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <ErrorBlock error={error} />
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-8">
                <Breadcrumbs className="bg-transparent p-0 mb-4">
                    <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                        Inicio
                    </Link>
                    <Link to="/contracts" className="text-blue-600 hover:text-blue-800 transition-colors">
                        Contratos
                    </Link>
                    <Typography color="blue-gray" className="font-medium">
                        Certificados de Entrega
                    </Typography>
                </Breadcrumbs>

                <div className="flex justify-between items-center">
                    <div>
                        <Typography variant="h3" className="text-gray-800 font-bold">
                            Certificados de Entrega
                        </Typography>
                        <Typography variant="small" color="gray" className="mt-1">
                            Gestiona y visualiza todos los certificados de entrega
                        </Typography>
                    </div>
                    <Chip
                        value={`${certificates.length} Certificados`}
                        className="bg-blue-50 text-blue-800"
                    />
                </div>
            </div>

            {/* Certificates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {certificates.map((certificate) => (
                    <Card
                        key={certificate.id}
                        className="hover:shadow-lg transition-shadow duration-300"
                    >
                        <CardBody className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                                </div>
                                <Chip
                                    value={`#${certificate.id}`}
                                    className="bg-blue-gray-50 text-blue-gray-800"
                                />
                            </div>

                            <div className="space-y-4">
                                {/* Equipment Code Section */}
                                <div
                                    onClick={() => navigate(`/products/${certificate.equipmentInventaryCode}`)}
                                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors group"
                                >
                                    <TagIcon className="h-5 w-5 text-blue-600" />
                                    <Typography className="font-medium flex-grow">
                                        {certificate.equipmentInventaryCode}
                                    </Typography>
                                    <ArrowTopRightOnSquareIcon className="h-4 w-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                {/* Quantity and Date Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2">
                                        <ClipboardDocumentListIcon className="h-5 w-5 text-gray-600" />
                                        <Typography className="font-medium">
                                            {certificate.quantity} {certificate.quantity === 1 ? 'unidad' : 'unidades'}
                                        </Typography>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CalendarDaysIcon className="h-5 w-5 text-gray-600" />
                                        <Tooltip content={formatDate(certificate.deliveryDate)}>
                                            <Typography className="font-medium truncate">
                                                {new Date(certificate.deliveryDate).toLocaleDateString()}
                                            </Typography>
                                        </Tooltip>
                                    </div>
                                </div>

                                {/* Notes */}
                                {certificate.notes && (
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <Typography variant="h6" color="black" className="font-medium">
                                            Notas
                                        </Typography>
                                        <Typography variant="small" className="mt-1">
                                            {certificate.notes}
                                        </Typography>
                                    </div>
                                )}

                                {/* Contract Link */}
                                <Button
                                    variant="text"
                                    className="flex items-center gap-2 w-full justify-center"
                                    onClick={() => navigate(`/contracts`)}
                                >
                                    Ver Contrato
                                    <ChevronRightIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default DeliveryCertificates;