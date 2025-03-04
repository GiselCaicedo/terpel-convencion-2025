import React from 'react';

// Define the base option interface
interface BaseOption {
  id?: string | number;
  value?: string | number;
  name?: string;
  nombre?: string;
  label?: string;
}

// Define the props for the SelectField component
interface SelectFieldProps<T extends BaseOption> {
  label: string;
  name: string;
  options?: T[];
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
}

export default function SelectField<T extends BaseOption>({
  label,
  name,
  options = [],
  value,
  onChange,
  required = false,
  disabled = false,
  placeholder = 'Seleccionar',
  error = ''
}: SelectFieldProps<T>) {
  // Function to determine which property to use as value
  const getOptionValue = (option: T): string | number => {
    // Check if the object has value or id
    if (option.value !== undefined) return option.value;
    if (option.id !== undefined) return option.id;
    return '';
  };

  // Function to determine which property to use as label
  const getOptionLabel = (option: T): string => {
    // Check if the object has label, nombre, or name
    if (option.label !== undefined) return String(option.label);
    if (option.nombre !== undefined) return String(option.nombre);
    if (option.name !== undefined) return String(option.name);
    return '';
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 font-terpel font-normal mb-2">
        {label} {required && <span className="text-terpel-red">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onChange} // Validate on blur as well
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-2 border ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      >
        <option value="">{placeholder}</option>
        {Array.isArray(options) && options.map((option) => (
          <option
            key={String(getOptionValue(option)) || Math.random().toString(36).substring(7)}
            value={getOptionValue(option)}
          >
            {getOptionLabel(option)}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-terpel-red">{error}</p>
      )}
    </div>
  );
}