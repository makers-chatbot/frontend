import { Button, Typography } from "@material-tailwind/react";
import { RecommendedProducts } from "../../widgets/custom";
import { useNavigate } from "react-router-dom";

export function Homepage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-gray-50 text-gray-800">
            {/* Hero Section */}
            <div className="w-full bg-gradient-to-r from-blue-700 to-purple-800 text-white text-center py-32">
                <div className="">
                    <Typography variant="h1" color="white" className="font-extrabold tracking-tight">
                        Bienvenido a <span className="text-blue-300">TechStore</span>
                    </Typography>
                    <Typography variant="lead" color="white" className="mt-4 font-light max-w-xl mx-auto">
                        Explora la mejor tecnología y descubre ofertas exclusivas para ti.
                    </Typography>
                    <Button color="light-blue" size="lg" className="mt-8 font-semibold" onClick={() => navigate("/products")}>
                        Ver Productos
                    </Button>
                </div>
            </div>

            {/* Características de la Tienda */}
            <section className="py-16 px-4 md:px-8 bg-white">
                <div className="container mx-auto text-center">
                    <Typography variant="h2" color="gray" className="font-bold mb-10">
                        ¿Por qué elegir TechStore?
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Tecnología Avanzada", description: "Ofrecemos los últimos lanzamientos y tecnología de punta." },
                            { title: "Precios Competitivos", description: "Los mejores precios del mercado, accesibles para todos." },
                            { title: "Entrega Rápida", description: "Envío inmediato para que disfrutes de tu compra cuanto antes." }
                        ].map((feature, index) => (
                            <div key={index} className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <Typography variant="h4" color="blue-gray" className="mb-2 font-semibold">
                                    {feature.title}
                                </Typography>
                                <Typography color="gray" className="text-md">
                                    {feature.description}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Productos Destacados */}
            <section className="container mx-auto py-16 px-4 md:px-8">
                <Typography variant="h2" color="gray" className="text-center font-bold mb-12">
                    Productos Destacados
                </Typography>
                <RecommendedProducts />
            </section>

            {/* Testimonios */}
            <section className="bg-gray-100 py-16 px-4 md:px-8">
                <div className="container mx-auto text-center">
                    <Typography variant="h2" color="gray" className="font-bold mb-10">
                        Opiniones de Nuestros Clientes
                    </Typography>
                    <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
                        {[
                            { name: "Carlos G.", feedback: "La mejor experiencia de compra. Productos de alta calidad y excelente servicio." },
                            { name: "Ana M.", feedback: "Los precios son imbatibles y la entrega fue rapidísima. ¡Totalmente recomendado!" },
                            { name: "Juan P.", feedback: "Una tienda confiable con una gran variedad de productos tecnológicos." }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                                <Typography variant="h5" color="blue-gray" className="font-semibold mb-2">
                                    {testimonial.name}
                                </Typography>
                                <Typography color="gray" className="italic">
                                    &quot;{testimonial.feedback}&quot;
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Homepage;
