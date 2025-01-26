import { Typography } from "@material-tailwind/react"

export function Footer() {
    return (
        <footer className="w-full bg-blue-gray-50 py-12 mt-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Makers Tech
                        </Typography>
                        <Typography className="text-blue-gray-600">
                            Your trusted store for high-quality technology products.
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Quick Links
                        </Typography>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-blue-gray-600 hover:text-blue-500">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-blue-gray-600 hover:text-blue-500">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-blue-gray-600 hover:text-blue-500">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Contact
                        </Typography>
                        <Typography className="text-blue-gray-600">
                            Email: info@makerstech.com
                            <br />
                            Phone: (123) 456-7890
                            <br />
                            Address: 123 Main St
                        </Typography>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
