import { TextInputLabel } from "../textInputs"

export function DepartmentForm({ departmentName, setDepartmentName, departmentDescription, setDepartmentDescription }) {

    return (
        <>
            <TextInputLabel
                label="Department name"
                placeholder="Department name"
                value={departmentName}
                onValueChange={setDepartmentName}
            />
            <TextInputLabel
                label="Department description"
                placeholder="Department description"
                value={departmentDescription}
                onValueChange={setDepartmentDescription}
            />
        </>
    )
}

export default DepartmentForm
