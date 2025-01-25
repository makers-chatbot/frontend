import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Button, Typography, Input, IconButton } from '@material-tailwind/react';
import { Bars3Icon, ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';



function NavList() {
    const token = sessionStorage.getItem('token')
    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Link to="/products">
                <Typography
                    as="li"
                    variant="h6"
                    color="blue-gray"
                    className="p-1 font-medium"
                >
                    Products
                </Typography>

            </Link>
            {
                token ? (
                    <>
                        <Link to={"/contracts"}>
                            <Typography
                                as="li"
                                variant="h6"
                                color="blue-gray"
                                className="p-1 font-medium"
                            >
                                Contracts
                            </Typography>
                        </Link>
                        <Link to={"/contracts/delivery-certificates"}>
                            <Typography
                                as="li"
                                variant="h6"
                                color="blue-gray"
                                className="p-1 font-medium"
                            >
                                Delivery Certificates
                            </Typography>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/auth/sign-in">
                            <Typography
                                as="li"
                                variant="h6"
                                color="blue-gray"
                                className="p-1 font-medium"
                            >
                                Sign In
                            </Typography>
                        </Link>
                    </>
                )
            }

        </ul>
    )
};


export function AppNavbar({ sticky = true }) {
    const navigate = useNavigate()
    const token = sessionStorage.getItem('token')

    function handleAuthNavigate() {
        console.log("token", token)
        if (!token) {
            navigate('/auth/sign-in')
        } else {
            navigate('/products/fav')
        }
    }


    return (
        <>
            <Navbar className={`${sticky ? "sticky" : ""} z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4`}>
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Link to="/">
                        <Typography
                            className="mr-4 cursor-pointer py-1.5 font-bold text-xl"
                        >
                            TechStore
                        </Typography>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:block">
                            <NavList />
                        </div>
                        <div className="flex items-center gap-x-1">
                            <Input
                                type="search"
                                placeholder="Buscar productos..."
                                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                labelProps={{
                                    className: "hidden",
                                }}
                                containerProps={{ className: "min-w-[288px]" }}
                            />
                            <IconButton variant="text" className="ml-auto h-6 w-6 text-blue-gray-900 hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden">
                                <Bars3Icon strokeWidth={2} className="h-6 w-6" />
                            </IconButton>
                        </div>
                        <div className="flex items-center gap-2">
                            <IconButton variant="text" className="h-6 w-6" onClick={handleAuthNavigate}>
                                <ShoppingCartIcon className="h-6 w-6" />
                            </IconButton>
                            <IconButton variant="text" className="h-6 w-6" onClick={handleAuthNavigate}>
                                <UserCircleIcon className="h-6 w-6" />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </Navbar>
        </>
    );
}

export default AppNavbar;
