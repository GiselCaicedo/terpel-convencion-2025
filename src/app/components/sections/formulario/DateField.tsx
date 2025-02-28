import React, { ChangeEvent } from 'react';

interface DateFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
    error?: string;
}

export default function DateField({ 
    label, 
    name, 
    value, 
    onChange, 
    required = false, 
    disabled = false,
    error = '' 
}: DateFieldProps) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type="date"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onChange}
                required={required}
                disabled={disabled}
                className={`w-full px-3 py-2 border ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}