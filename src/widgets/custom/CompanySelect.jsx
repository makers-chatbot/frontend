import { useEffect, useState } from "react";
import apiClient from "../../services/ApiClient";
import { Spinner } from "@material-tailwind/react";
import { SelectInputLabel } from "../textInputs";
import { ErrorBlock } from "../blocks";

export function CompanySelect({ selectedCompany, setSelectedCompany }) {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCompanies = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await apiClient.get("/companies");
                setCompanies(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCompanies();
    }, []);
    if (loading) return <Spinner color="blue" className="h-4 w-4" />;
    if (error) return <ErrorBlock error={error} />;

    return <SelectInputLabel label="Company" placeholder="Select a company" values={companies} onValueChange={setSelectedCompany} />;
}

export default CompanySelect;
