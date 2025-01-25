import { Typography, Select, Option } from "@material-tailwind/react";

export function SelectInputLabel({ values, onValueChange, label, placeholder }) {
    return (
        <div className="mb-1 flex flex-col gap-4">
            <Typography variant="h6" color="blue-gray" className="-mb-3 font-medium">
                {label}
            </Typography>
            <Select
                size="lg"
                placeholder={placeholder}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
            >
                {values ?
                    values.map((value, index) => (
                        <Option key={index} value={String(value?.id) || value} onClick={() => onValueChange(value)}>
                            {value?.name || value}
                        </Option>
                    ))
                    :
                    <Option value={placeholder}>
                        {placeholder}
                    </Option>
                }
            </Select>
        </div>
    );
}

export default SelectInputLabel;
