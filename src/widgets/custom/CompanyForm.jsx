import { TextInputLabel } from "../textInputs";

export function CompanyForm({
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
}) {
    return (
        <>
            <TextInputLabel
                label="Company tax id"
                placeholder="Company tax id"
                value={nit}
                onValueChange={setNit}
            />
            <TextInputLabel
                label="Company name"
                placeholder="Company name"
                value={companyName}
                onValueChange={setCompanyName}
            />
            <TextInputLabel
                label="Industry"
                placeholder="Industry"
                value={industry}
                onValueChange={setIndustry}
            />
            <TextInputLabel
                label="Address"
                placeholder="Address"
                value={address}
                onValueChange={setAddress}
            />
            <TextInputLabel
                label="Company telephone"
                placeholder="Company telephone"
                value={companyTelephone}
                onValueChange={setCompanyTelephone}
            />
            <TextInputLabel
                label="Company email"
                placeholder="Company email"
                value={companyEmail}
                onValueChange={setCompanyEmail}
            />
            <TextInputLabel
                label="Country"
                placeholder="Country"
                value={country}
                onValueChange={setCountry}
            />
            <TextInputLabel
                label="State"
                placeholder="State"
                value={state}
                onValueChange={setState}
            />
        </>
    );
}

export default CompanyForm;
