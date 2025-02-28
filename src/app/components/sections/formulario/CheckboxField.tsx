import React, { MouseEvent } from 'react';

interface CheckboxFieldProps {
    label: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    onClick?: ((event: MouseEvent<HTMLLabelElement>) => void) | undefined;
    error?: string;
}

export default function CheckboxField({
    label,
    name,
    checked,
    onChange,
    required = false,
    onClick = undefined,
    error = ''
}: CheckboxFieldProps) {
    return (
        <div className="mb-4">
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                        type="checkbox"
                        id={name}
                        name={name}
                        checked={checked}
                        onChange={onChange}
                        required={required}
                        className={`h-4 w-4 ${error ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-red-500 text-red-600`}
                    />
                </div>
                <div className="ml-2 text-sm">
                    <label
                        htmlFor={name}
                        className={`${error ? 'text-red-600' : 'text-gray-700'} font-medium cursor-pointer`}
                        onClick={onClick}
                    >
                        {label} {required && <span className="text-red-600">*</span>}
                    </label>
                    {error && (
                        <p className="mt-1 text-sm text-red-600">{error}</p>
                    )}
                </div>
            </div>
        </div>
    );
}