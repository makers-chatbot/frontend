import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/ApiClient";
import { signInUser } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/features/userSlice";

export function SignIn() {
    const navigate = useNavigate();

    const [checked, setChecked] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    // const handleLogout = () => {
    //     dispatch(logout());
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        sessionStorage.removeItem("token");

        try {
            const response = await signInUser({ username, password });
            console.log(response);
            dispatch(login(response.data.userDTO));

            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("roles", response.data.userDTO.rolesNames);
            console.log("session roles", sessionStorage.getItem("roles"));
            navigate("/products");
        } catch (error) {
            setError("Error al iniciar sesión");
        }
    };

    return (
        <section className="m-8 flex gap-4">
            <div className="w-full lg:w-3/5 mt-24">
                <div className="text-center">
                    <Typography variant="h2" color="blue" className="font-bold mb-4">
                        Sign In to TechStore
                    </Typography>
                    <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="text-lg font-normal"
                    >
                        Enter your username and password to Sign In.
                    </Typography>
                </div>
                <form
                    className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3 font-medium"
                        >
                            Your username
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="name@mail.com"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3 font-medium"
                        >
                            Password
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error &&
                            <Typography
                                variant="h6"
                                color="red"
                                className="mb-2 font-medium"
                            >
                                {error}
                            </Typography>
                        }
                    </div>
                    <Checkbox checked={checked} onChange={() => setChecked(checked => !checked)}
                        label={
                            <Typography
                                variant="h6"
                                color="gray"
                                className="flex items-center justify-start font-medium"
                            >
                                I agree the&nbsp;
                                <p className="font-normal text-black transition-colors hover:text-gray-900 underline">
                                    Terms and Conditions
                                </p>
                            </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                    />

                    <Button className="mt-6" fullWidth color="blue" type="submit" disabled={!checked}>
                        {/* {1>2 ? "Iniciando..." : "Entrar"} */}
                        Entrar
                    </Button>

                    <div className="flex items-center justify-between gap-2 mt-6">
                        <Typography variant="small" className="font-medium text-gray-900">
                            <Link to="/forgot-password">Forgot Password</Link>
                        </Typography>
                    </div>
                    <Typography
                        variant="paragraph"
                        className="text-center text-blue-gray-500 font-medium mt-4"
                    >
                        Not registered?
                        <Link to="/auth/sign-up" className="text-gray-900 ml-1">
                            Create account
                        </Link>
                    </Typography>
                </form>
            </div>
            <div className="w-2/5 h-full hidden lg:block">
                <img
                    src="/img/pattern.png"
                    className="h-full w-full object-cover rounded-3xl"
                />
            </div>
        </section>
    );
}

export default SignIn;
