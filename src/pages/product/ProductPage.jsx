import {
    Input,
    Typography,
    Select,
    Option,
    Card,
    CardBody,
    IconButton,

    SpeedDialHandler,
    SpeedDial
} from "@material-tailwind/react";
import { useState } from "react";
import { CategorySidebar } from "../../widgets/layout";
import { ProductList } from "../../widgets/custom";
import { MagnifyingGlassIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";


export function ProductPage() {
    const [category, setCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("price-asc");
    const navigate = useNavigate();


    return (
        <div className="flex min-w-full bg-gray-50 ">
            <CategorySidebar setCategory={setCategory} />
            <div className="w-5/6 p-8">
                {/* Header de productos */}
                <Card shadow={true} className="bg-blue-800 text-white p-8 mb-8 rounded-2xl bg">
                    <CardBody className="text-center">
                        <Typography variant="h2" className="font-bold">
                            Explore Our Technology Collection
                        </Typography>
                        <Typography variant="paragraph" className="mt-2 text-lg">
                            Find the Latest High-End Technology Models
                        </Typography>
                    </CardBody>
                </Card>

                {/* Barra de búsqueda y filtros */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
                    {/* Barra de búsqueda con icono */}

                    <Input
                        type="text"
                        label="Search products"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        icon={searchQuery ? <XMarkIcon className="h-5 w-5 text-gray-500" onClick={() => setSearchQuery("")} /> : <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />}
                    />

                    {/* Sort by */}
                    <Select
                        label="Sort by"
                        value={sortOption}
                        onChange={(value) => setSortOption(value)}
                        className="lg:w-full md:w-1/4"
                    >
                        <Option value="price-asc">Price: Low to High</Option>
                        <Option value="price-desc">Price: High to Low</Option>
                    </Select>
                </div>

                {/* Lista de productos */}
                <div className="mt-8">
                    <ProductList category={category} searchQuery={searchQuery} sortOption={sortOption} />
                </div>
                {
                    (sessionStorage.getItem("roles")?.includes("ADMIN")) && (
                        <div className="fixed bottom-8 right-8">
                            <SpeedDial>
                                <SpeedDialHandler>
                                    <IconButton size="lg" className="rounded-full" onClick={() => navigate("/products/manage")}>
                                        <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                                    </IconButton>
                                </SpeedDialHandler>
                            </SpeedDial>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default ProductPage;
