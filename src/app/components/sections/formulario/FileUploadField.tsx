import Image from "next/image";
import { useState, useRef, ChangeEvent, useEffect } from "react";

// Define interface for component props
interface FileUploadFieldProps {
    label: string;
    name: string;
    onChange: (e: { target: { name: string; value: string; type: string } }) => void;
    required?: boolean;
    error?: string;
    accept?: string;
    helperText?: string;
    allowCamera?: boolean;
    value?: string; // Add value prop to check if there's already a file
}

export default function FileUploadField({
    label,
    name,
    onChange,
    required = false,
    error = '',
    accept = "image/*",
    helperText = "",
    allowCamera = true,
    value = "" // Default to empty string
}: FileUploadFieldProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>(value || "");
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const [internalError, setInternalError] = useState<string>(error);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    // Update internal state when external props change
    useEffect(() => {
        if (value) {
            setFileName(value);
            // Clear the error if we have a value
            setInternalError("");
        } else {
            setFileName("");
            // Only set error if required and no value
            setInternalError(required ? error || "Este campo es obligatorio" : "");
        }
    }, [value, error, required]);

    // Función para procesar el archivo (compartida entre cámara y subida normal)
    const processFile = (file: File) => {
        // Verificar que la longitud no exceda 255 caracteres
        if (file.name.length <= 255) {
            // Almacenar el nombre del archivo
            setFileName(file.name);
            // Clear any errors when file is selected
            setInternalError("");

            // IMPORTANTE: Pasar solo el nombre del archivo como string
            onChange({
                target: {
                    name,
                    value: file.name,
                    type: 'text'
                }
            });

            // Generar vista previa
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result as string;
                setPreview(dataUrl);
                
                // Obtener dimensiones de la imagen para el componente Image
                const img = new window.Image();
                img.onload = () => {
                    setImageDimensions({
                        width: img.width,
                        height: img.height
                    });
                };
                img.src = dataUrl;
            };
            reader.readAsDataURL(file);
        } else {
            alert(`El nombre del archivo "${file.name}" excede el límite de 255 caracteres.`);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    // Nueva función para manejar la captura de la cámara
    const handleCameraCapture = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Generar un nombre con timestamp para la foto capturada
            const timestamp = new Date().getTime();
            const newFileName = `photo_${timestamp}.jpg`;
            
            // Crear un nuevo archivo con el nombre personalizado
            const renamedFile = new File([file], newFileName, { type: file.type });
            
            processFile(renamedFile);
        }
    };

    const handleRemoveFile = () => {
        setFileName("");
        setPreview(null);
        setImageDimensions({ width: 0, height: 0 });
        
        // Set error if the field is required
        if (required) {
            setInternalError("Este campo es obligatorio");
        }

        // Limpiar el valor de ambos inputs
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        if (cameraInputRef.current) {
            cameraInputRef.current.value = "";
        }

        // Notificar que se eliminó el archivo
        onChange({
            target: {
                name,
                value: "",
                type: 'text'
            }
        });
    };

    // Check if we should display a validation message
    const shouldShowValidationError = required && !fileName && internalError;

    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
                {label} {required && <span className="text-red-600">*</span>}
            </label>

            {preview && imageDimensions.width > 0 && (
                <div className="mb-2 relative">
                    <Image
                        src={preview}
                        alt="Vista previa"
                        width={imageDimensions.width}
                        height={imageDimensions.height}
                        className="h-40 object-contain border rounded-md w-full"
                        unoptimized={true} // Importante para imagenes data URL
                    />
                    <button
                        type="button"
                        onClick={() => setPreview(null)}
                        className="absolute top-1 right-1 bg-gray-800 bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                        aria-label="Quitar vista previa"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            <div className="flex gap-2">
                <label className={`flex-grow flex items-center justify-center px-4 py-2 bg-white border ${shouldShowValidationError ? 'border-red-500' : 'border-gray-300'} rounded-md cursor-pointer hover:bg-gray-50`}>
                    <span className="text-sm text-gray-700">
                        {fileName ? `Archivo: ${fileName}` : "Subir archivo"}
                    </span>
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept={accept}
                        onChange={handleFileChange}
                    />
                </label>

                {allowCamera && (
                    <label className="flex-shrink-0 flex items-center justify-center px-3 py-2 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <input
                            ref={cameraInputRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            capture="environment"
                            onChange={handleCameraCapture}
                        />
                    </label>
                )}

                {fileName && (
                    <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="flex-shrink-0 px-2 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-red-500"
                        aria-label="Eliminar archivo"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                )}
            </div>

            {helperText && !shouldShowValidationError && (
                <p className="mt-1 text-xs text-gray-500">{helperText}</p>
            )}

            {shouldShowValidationError && (
                <p className="mt-1 text-sm text-red-600">La imagen {label.toLowerCase()} es obligatoria</p>
            )}
        </div>
    );
}