import React, { useEffect, useState } from "react";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import { getCategories } from "../../services";
import { ErrorBlock } from "../blocks";

export const CategorySidebar = ({ setCategory }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getCategories();
                setCategories(response.data);
            } catch (err) {
                setError("Error al cargar las categorías");
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);
    if (loading) {
        return <Spinner className="h-8 w-8" />;
    }


    return (
        <div className="w-1/6 h-full bg-white text-white p-5">
            <div className="text-center mb-6">
                <Typography variant="h2" color="light-blue">
                    Tech Categories
                </Typography>
                <Typography variant="h6" color="black" className="mt-4">
                    Explore different categories of technology
                </Typography>
            </div>
            <div className="space-y-4">
                <Button
                    key={0}
                    fullWidth
                    className="bg-transparent text-black hover:bg-indigo-700 hover:text-white text-left"
                    onClick={() => setCategory("All")}
                >
                    All
                </Button>
                {categories && categories.map((category, index) => (
                    <Button
                        key={index + 1}
                        fullWidth
                        className="bg-transparent text-black hover:bg-indigo-700 hover:text-white text-left"
                        onClick={() => setCategory(category.name)}
                    >
                        {category.name}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default CategorySidebar;
