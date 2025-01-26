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
                        Welcome to <span className="text-blue-300">Makers Tech</span>
                    </Typography>
                    <Typography variant="lead" color="white" className="mt-4 font-light max-w-xl mx-auto">
                        Explore the best technology and discover exclusive offers for you.
                    </Typography>
                    <Button color="light-blue" size="lg" className="mt-8 font-semibold" onClick={() => navigate("/products")}>
                        View Products
                    </Button>
                </div>
            </div>

            {/* Store Features */}
            <section className="py-16 px-4 md:px-8 bg-white">
                <div className="container mx-auto text-center">
                    <Typography variant="h2" color="gray" className="font-bold mb-10">
                        Why Choose Makers Tech?
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Advanced Technology", description: "We offer the latest releases and cutting-edge technology." },
                            { title: "Competitive Prices", description: "The best market prices, accessible to everyone." },
                            { title: "Fast Delivery", description: "Immediate shipping so you can enjoy your purchase right away." }
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

            {/* Featured Products */}
            <section className="container mx-auto py-16 px-4 md:px-8">
                <Typography variant="h2" color="gray" className="text-center font-bold mb-12">
                    Featured Products
                </Typography>
                <RecommendedProducts />
            </section>

            {/* Testimonials */}
            <section className="bg-gray-100 py-16 px-4 md:px-8">
                <div className="container mx-auto text-center">
                    <Typography variant="h2" color="gray" className="font-bold mb-10">
                        Customer Reviews
                    </Typography>
                    <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
                        {[
                            { name: "Charles G.", feedback: "Best shopping experience. High-quality products and excellent service." },
                            { name: "Anna M.", feedback: "Unbeatable prices and super fast delivery. Highly recommended!" },
                            { name: "John P.", feedback: "A reliable store with a great variety of tech products." }
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
