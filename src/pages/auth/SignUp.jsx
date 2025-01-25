import {
    Tabs,
    TabsHeader,
    Tab,
    Checkbox,
    Stepper,
    Step,
    Button,
    Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    CompanyForm,
    CompanySelect,
    DepartmentForm,
    DepartmentSelect,
    UserForm,
} from "../../widgets/custom";
import { createCompany, createDepartment, createUser } from "../../services";
import { ErrorBlock } from "../../widgets/blocks";

function getSteps() {
    return ["Company Information", "Department Information", "User Information"];
}

function getStepContent(stepIndex, props) {
    switch (stepIndex) {
        case 0:
            return <CompanyForm {...props} />;
        case 1:
            return <DepartmentForm {...props} />;
        case 2:
            return <UserForm {...props} />;
        default:
            return "Unknown stepIndex";
    }
}

export function SignUp() {
    //React hoooks
    const navigate = useNavigate();

    //Info status
    const [isWorker, setIsWorker] = useState(true);
    const [error, setError] = useState(null);

    // User States
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    // Company States

    const [nit, setNit] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [industry, setIndustry] = useState("");
    const [address, setAddress] = useState("");
    const [companyTelephone, setCompanyTelephone] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");

    // Department States

    const [departmentName, setDepartmentName] = useState("");
    const [departmentDescription, setDepartmentDescription] = useState("");

    // Company Select
    const [selectedCompany, setSelectedCompany] = useState(null);

    // Department Select
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    // Stepper

    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const stepProps = {
        nit,
        setNit,
        companyName,
        setCompanyName,
        industry,
        setIndustry,
        address,
        setAddress,
        companyTelephone,
        setCompanyTelephone,
        companyEmail,
        setCompanyEmail,
        country,
        setCountry,
        state,
        setState,
        departmentName,
        setDepartmentName,
        departmentDescription,
        setDepartmentDescription,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
    };

    // -----------------------------------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isWorker) {
            const body = {
                username: username,
                password: password,
                email: email,
                companyId: selectedCompany.id,
                departmentId: selectedDepartment.id,
                rolesNames: ["WORKER"],
            };
            try {
                const response = await createUser(body);
                if (response.status === 200) {
                    navigate("/auth/sign-in");
                }
            } catch (error) {
                setError(error.message);
            }
        } else {
            const companyBody = {
                nit: nit,
                name: companyName,
                industry: industry,
                address: address,
                phone: companyTelephone,
                email: companyEmail,
                country: country,
                state: state,
            };
            try {
                const responseCompany = await createCompany(companyBody);
                if (responseCompany.status === 200) {
                    setSelectedCompany(responseCompany.data);
                }
                const departmentBody = {
                    name: departmentName,
                    description: departmentDescription,
                    companyId: responseCompany.data.id,
                };
                const responseDepartment = await createDepartment(departmentBody);
                if (responseDepartment.status === 200) {
                    setSelectedDepartment(responseDepartment.data);
                }
                const userBody = {
                    username: username,
                    password: password,
                    email: email,
                    companyId: responseCompany.data.id,
                    departmentId: responseDepartment.data.id,
                    rolesNames: ["BUSINESS_MANAGER"],
                };
                const responseUser = await createUser(userBody);
                if (responseUser.status === 200) {
                    navigate("/auth/sign-in");
                }
            } catch (error) {
                setError(error.message);
            }
        }
    };

    if (error) {
        return <ErrorBlock error={error} />;
    }

    return (
        <section className="p-8 flex w-full h-full">
            <div className="w-2/5 h-full hidden lg:block">
                <img
                    src="/img/pattern.png"
                    className="h-full w-full object-cover rounded-3xl"
                />
            </div>
            <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center m-4">
                    <Typography variant="h2" color="blue" className="font-bold mb-4">
                        Join Us Today
                    </Typography>
                    <Typography variant="h5" color="blue-gray">
                        How do you want to register?
                    </Typography>
                </div>
                <Tabs value="worker" className="w-1/3">
                    <TabsHeader>
                        <Tab
                            key={"worker"}
                            value={"worker"}
                            onClick={() => setIsWorker(true)}
                        >
                            Worker
                        </Tab>
                        <Tab key={"bm"} value={"bm"} onClick={() => setIsWorker(false)}>
                            Bussiness Manager
                        </Tab>
                    </TabsHeader>
                </Tabs>
                <div className="flex flex-col items-center mt-4">
                    <Typography variant="h5" color="blue-gray">
                        Fill the following fields to register.
                    </Typography>
                </div>
                <form
                    className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-1 flex flex-col gap-6">
                        {/* User fields */}
                        {isWorker ? (
                            <>
                                <UserForm
                                    username={username}
                                    setUsername={setUsername}
                                    email={email}
                                    setEmail={setEmail}
                                    password={password}
                                    setPassword={setPassword}
                                />
                                <CompanySelect
                                    selectedCompany={selectedCompany}
                                    setSelectedCompany={setSelectedCompany}
                                />
                                <DepartmentSelect
                                    companyId={selectedCompany?.id}
                                    selectedDepartment={selectedDepartment}
                                    setSelectedDepartment={setSelectedDepartment}
                                />
                            </>
                        ) : (
                            <div>
                                <Stepper activeStep={activeStep}>
                                    {steps.map((label, index) => {
                                        return (
                                            <Step key={label}>
                                                <Typography className="h5">{index + 1}</Typography>
                                            </Step>
                                        );
                                    })}
                                </Stepper>
                                <div>
                                    {activeStep === steps.length ? (
                                        <div>
                                            <Typography>¡Todos los pasos completados!</Typography>
                                            <Button onClick={handleReset}>Resetear</Button>
                                        </div>
                                    ) : (
                                        <div className="mt-4">
                                            <Typography variant="h3" color="blue-gray" className="my-2">
                                                {getSteps()[activeStep]}
                                            </Typography>
                                            {getStepContent(activeStep, stepProps)}
                                            <div className="w-full my-4 flex flex-row items-center justify-between">
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}
                                                >
                                                    Atrás
                                                </Button>
                                                <Button onClick={handleNext} >
                                                    {activeStep === steps.length - 1
                                                        ? "Finalizar"
                                                        : "Siguiente"}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <Checkbox
                        label={
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center justify-start font-medium"
                            >
                                I agree the&nbsp;
                                <span className="font-normal text-black transition-colors hover:text-gray-900 underline">
                                    Terms and Conditions
                                </span>
                            </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                    />
                    <Button className="mt-6" fullWidth color="blue" type="submit" disabled={!username || !password || !email}>
                        {"Register Now"}
                    </Button>
                    {error && (
                        <Typography variant="small" color="red" className="mt-2">
                            {error}
                        </Typography>
                    )}
                    <Typography
                        variant="paragraph"
                        className="text-center text-blue-gray-500 font-medium mt-4"
                    >
                        Already have an account?
                        <Link to="/auth/sign-in" className="text-gray-900 ml-1">
                            Sign in
                        </Link>
                    </Typography>
                </form>
            </div>
        </section>
    );
}

export default SignUp;
