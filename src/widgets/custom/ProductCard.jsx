import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { ImagePlacehoderSkeleton } from "../skeleton";
import { useDispatch, useSelector } from "react-redux";
import { postInteraction } from "../../services/InteractionServices";

export function ProductCard({ product }) {
    const navigate = useNavigate();

    const user = useSelector((state) => state.user.value);
    console.log("user", user);

    async function handleNavigate() {

        if (!user) {
            return;
        }

        try {
            if (!user.companyId || !user.departmentId) {
                return;
            }

            const body = {
                "companyId": user.companyId,
                "departmentId": user.departmentId,
                "category": product.category,
                "likes": 0,
                "interactionsCounter": 1
            }
            console.log(body);
            const response = await postInteraction(body);
            if (response.status > 199 && response.status < 300) {
                console.log("Interes dado correctamente");
            }

        } catch (error) {
            console.log("Error al darle interes: ", error);
        } finally {
            navigate(`/products/${product.id}`);
        }
    }

    const [imageError, setImageError] = useState(false);
    return (
        <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center">
            <CardHeader color="white" className="relative h-[80%] w-[80%] mt-4">
                {imageError ? (
                    <ImagePlacehoderSkeleton />
                ) : (
                    <img
                        src={product.images.front}
                        alt={product.name}
                        className="h-full w-full object-cover"
                        onError={() => setImageError(true)}
                    />
                )}
            </CardHeader>
            <CardBody className="text-center p-6">
                <Typography
                    variant="h5"
                    color="blue-gray"
                    className="font-semibold mb-2"
                >
                    {product.name}
                </Typography>
                <Typography color="gray" className="text-md">
                    ${product.price}
                </Typography>
            </CardBody>
            <CardFooter className="flex justify-center">
                <Button
                    color="blue"
                    variant="gradient"
                    fullWidth
                    onClick={handleNavigate}
                >
                    Ver Detalles
                </Button>
            </CardFooter>
        </Card>
    );
}

export default ProductCard;
