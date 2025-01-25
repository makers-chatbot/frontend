import React from "react";
import { Button, Typography, Input } from "@material-tailwind/react";

export function ErrorBlock({ error }) {
    const currentYear = new Date().getFullYear();

    return (
        <section className="grid h-screen w-full bg-cover bg-center bg-no-repeat bg-[url('/image/coming-soon-1.jpg')]">
            <div className="container mx-auto flex flex-col justify-center h-full px-8 text-center">
                <div className="my-auto text-center">
                    <Typography
                        variant="h2"
                        color="white"
                        className="lg:!text-4xl !text-3xl"
                    >
                        {"I'm sorry, we're not ready yet!"}
                    </Typography>
                    <Typography
                        variant="lead"
                        className="mb-10 mt-4 mx-auto text-gray-400 w-full lg:max-w-3xl"
                    >
                        We are working hard to fix this issue. Please check back later.
                        An idea about what happened is {error}
                    </Typography>
                    <Typography
                        variant="lead"
                        className="font-bold text-gray-400 mb-6"
                    >
                        There was an error, please try again later.
                    </Typography>
                </div>
            </div>
        </section>
    );
}

export default ErrorBlock;