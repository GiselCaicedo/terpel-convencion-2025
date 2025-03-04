import React, { useState, ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  maxLength?: number;
  icon?: React.ReactNode;
  autoComplete?: string;
  min?: string | number;
  max?: string | number;
  pattern?: string;
  customValidation?: (value: string) => boolean;
}

export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder = "",
  error = "",
  helperText = "",
  disabled = false,
  maxLength,
  icon,
  autoComplete,
  min,
  max,
  pattern,
  customValidation
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  
  // Manejar cambio con formato para tipos específicos
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
    // Si hay validación personalizada, ejecutarla
    if (customValidation && typeof customValidation === 'function') {
      const isValid = customValidation(value);
      if (!isValid) {
        // La validación personalizada puede manejar el error a través del onChange
      }
    }
    
    // Formateo específico para ciertos tipos de campos
    if (type === 'tel' || name === 'celular' || name === 'numero_celular') {
      // Permitir solo números y aplicar formato si es necesario
      const digits = value.replace(/\D/g, '');
      
      // Limitar a maxLength si está definido
      const formattedValue = maxLength ? digits.slice(0, maxLength) : digits;
      
      // Pasar al onChange el evento con el valor formateado
      const customEvent = {
        target: {
          name,
          value: formattedValue,
          type
        }
      } as ChangeEvent<HTMLInputElement>;
      
      onChange(customEvent);
    } else {
      // Para otros tipos, pasar el evento tal cual
      onChange(e);
    }
    
    // Marcar como dirty (modificado) una vez que el usuario haya cambiado el valor
    if (!isDirty) {
      setIsDirty(true);
    }
  };
  
  // Determinar si mostrar el indicador de campo requerido
  const showRequiredIndicator = required && label;
  
  // Determinar las clases CSS basadas en el estado
  const inputClasses = `
    w-full 
    px-4 
    py-2 
    border 
    rounded-md 
    transition-all 
    duration-200
    ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
    ${error ? 'border-red-500 bg-red-50' : isFocused ? 'border-red-400 shadow-sm' : 'border-gray-300'}
    ${isFocused ? 'ring-2 ring-red-200' : ''}
    focus:outline-none 
    placeholder:text-gray-400
    ${icon ? 'pl-10' : ''}
  `;
  
  // ID único para este campo
  const fieldId = `field-${name}`;
  const errorId = `${name}-error`;
  const helperId = `${name}-helper`;

  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={fieldId} 
          className={`block text-gray-700 font-terpel font-normal mb-2 ${disabled ? 'text-gray-500' : ''}`}
        >
          {label} {showRequiredIndicator && <span className="text-terpel-red">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
        
        <input
          type={type}
          id={fieldId}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            // Validar al perder el foco si está configurado en onChange
            if (onChange) {
              onChange(e);
            }
          }}
          required={required}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          maxLength={maxLength}
          autoComplete={autoComplete}
          min={min}
          max={max}
          pattern={pattern}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
        />
        
        {/* Indicador de campo válido cuando no hay error y está dirty */}
        {isDirty && !error && type !== "password" && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg 
              className="h-5 w-5 text-green-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        )}
      </div>
      
      {/* Texto de ayuda */}
      {helperText && !error && (
        <p id={helperId} className="mt-1 text-xs text-gray-500">
          {helperText}
        </p>
      )}
      
      {/* Mensaje de error */}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-terpel-red">
          {error}
        </p>
      )}
      
      {/* Contador de caracteres si maxLength está definido */}
      {maxLength && (
        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-500">
            {typeof value === 'string' ? value.length : 0}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
}