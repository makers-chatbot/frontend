import { Typography } from "@material-tailwind/react"

export function Footer() {
    return (
        <footer className="w-full bg-blue-gray-50 py-12 mt-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            TechStore
                        </Typography>
                        <Typography className="text-blue-gray-600">
                            Tu tienda de confianza para productos tecnológicos de alta calidad.
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Enlaces Rápidos
                        </Typography>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-blue-gray-600 hover:text-blue-500">
                                    Sobre Nosotros
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-blue-gray-600 hover:text-blue-500">
                                    Contacto
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-blue-gray-600 hover:text-blue-500">
                                    Política de Privacidad
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Contacto
                        </Typography>
                        <Typography className="text-blue-gray-600">
                            Email: info@techstore.com
                            <br />
                            Teléfono: (123) 456-7890
                            <br />
                            Dirección: Calle 5 # 123
                        </Typography>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
