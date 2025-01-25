export function createProduct(productData, type) {
    const commonProperties = {
        id: productData.id,
        name: productData.name,
        brand: productData.brand,
        model: productData.model,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        warrantyPeriod: productData.warrantyPeriod,
        releaseDate: productData.releaseDate,
        specifications: productData.specifications,
        images: productData.images,
        category: productData.category
    };

    let specificProperties = {};

    switch (type) {
        case "Laptop":
            specificProperties = {
                processor: productData.processor,
                ram: productData.ram,
                storageType: productData.storageType,
                storageCapacity: productData.storageCapacity,
                graphicsCard: productData.graphicsCard,
                operatingSystem: productData.operatingSystem
            };
            break;
        case "Printer":
            specificProperties = {
                printingTechnology: productData.printingTechnology,
                connectivityOptions: productData.connectivityOptions
            };
            break;
        case "Smartphone":
            specificProperties = {
                screenSize: productData.screenSize,
                batteryLife: productData.batteryLife,
                cameraResolution: productData.cameraResolution,
                operatingSystem: productData.operatingSystem
            };
            break;
        default:
            specificProperties = {};
    }

    return { ...commonProperties, specificProperties };
}

// Ejemplo de uso:
const exampleLaptop = {
    id: "67326e1d70684a2b9a73e524",
    name: "Gaming Laptop",
    brand: "BrandX",
    model: "ModelY",
    description: "A high-performance gaming laptop with great specifications.",
    price: 1500.0,
    stock: 50,
    warrantyPeriod: 24,
    releaseDate: 1622520000000,
    specifications: null,
    images: {
        front: "http://example.com/image1.jpg",
        side: "http://example.com/image2.jpg"
    },
    category: "Laptop",
    processor: "Intel i7",
    ram: "16GB",
    storageType: "SSD",
    storageCapacity: "512GB",
    graphicsCard: "NVIDIA GTX 1660",
    operatingSystem: "Windows 10"
};

console.log(createProduct(exampleLaptop));
