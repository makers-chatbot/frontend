import { useEffect, useState } from "react";
import apiClient from "../../services/ApiClient";
import { Spinner } from "@material-tailwind/react";
import { SelectInputLabel } from "../textInputs";
import { ErrorBlock } from "../blocks";

export function DepartmentSelect({ selectedDepartment, setSelectedDepartment, companyId }) {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await apiClient.get("/departments");
                setDepartments(response.data);
            } catch (err) {
                setError("Error al cargar los departamentos");
            } finally {
                setLoading(false);
            }
        };
        fetchDepartments();
    }, []);

    if (loading) return <Spinner color="blue" className="h-4 w-4" />;
    if (error) return <ErrorBlock error={error} />;


    return (
        <SelectInputLabel
            label="Department"
            placeholder="Select a department"
            values={departments.filter((department) => department.companyId === companyId)}
            onValueChange={setSelectedDepartment}
        />
    );
}

export default DepartmentSelect;
