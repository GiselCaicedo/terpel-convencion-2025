'use client';

import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SelectField from '@/app/components/sections/formulario/SelectField';
import InputField from '@/app/components/sections/formulario/InputField';
import FileUploadField from '@/app/components/sections/formulario/FileUploadField';
import CheckboxField from '@/app/components/sections/formulario/CheckboxField';
import DateField from '@/app/components/sections/formulario/DateField';
import { fetchCiudades, fetchInitialData, fetchJefesZona, registerUser } from '../service/conexion';
import PDFViewer from '../components/sections/formulario/PdfViewer';
import {
    User,
    Home,
    Settings,
    Check,
    ClipboardListIcon,
    TicketsPlane
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ValidationErrors {
    [fieldName: string]: string;
}

interface ApiError {
    errors?: {
        [key: string]: string;
    };
    message?: string;
}

interface Regional {
    id: string;
    nombre: string;
}

interface JefeZona {
    id: string;
    nombre: string;
}

interface Departamento {
    id: string;
    nombre: string;
}

interface Ciudad {
    id: string;
    nombre: string;
}

interface FormaPago {
    id: string;
    nombre: string;
}

interface TipoDocumento {
    id: string;
    nombre: string;
}

interface Acomodacion {
    id: string;
    nombre: string;
}

interface Extension {
    id: string;
    nombre: string;
}

interface DataLists {
    regionales: Regional[];
    jefes_zona: JefeZona[];
    departamentos: Departamento[];
    ciudades: Ciudad[];
    formas_pago: FormaPago[];
    tipos_documento: TipoDocumento[];
    acomodaciones: Acomodacion[];
    extensiones: Extension[];
}

interface AcompananteData {
    primer_nombre: string;
    segundo_nombre?: string;
    primer_apellido: string;
    segundo_apellido?: string;
    tipo_documento_id: string;
    numero_documento: string;
    fecha_nacimiento: string;
    numero_celular: string;
    numero_pasaporte: string;
    fecha_emision_pasaporte: string;
    fecha_caducidad_pasaporte: string;
    imagen_pasaporte: File | null;
    solicitud_especial?: string;
    restriccion_alimentaria?: string;
}

interface FormDataType {
    regional_id: string;
    name_eds: string;
    razon_social: string;
    jefe_de_zona_id: string;
    primer_nombre: string;
    segundo_nombre?: string;
    primer_apellido: string;
    segundo_apellido?: string;
    departamento_id: string;
    ciudad_id: string;
    email: string;
    celular: string;
    acomodacion_id: string;
    extension_id: string;
    forma_de_pago_id: string;
    solicitud_especial?: string;
    terminos_y_condiciones: boolean;
    tipo_documento_id: string;
    numero_documento: string;
    nacionalidad: string;
    fecha_nacimiento: string;
    numero_pasaporte: string;
    fecha_emision_pasaporte: string;
    fecha_caducidad_pasaporte: string;
    imagen_pasaporte: File | null;
    restriccion_alimentaria?: string;
    nombre_completo?: string;
    tiene_acompanante?: boolean;
    acompanante?: AcompananteData;
}

export default function RegistrationForm() {
    const initialFormState = {
        regional_id: '',
        name_eds: '',
        razon_social: '',
        jefe_de_zona_id: '',
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        departamento_id: '',
        ciudad_id: '',
        email: '',
        celular: '',
        acomodacion_id: '',
        extension_id: '',
        forma_de_pago_id: '',
        solicitud_especial: '',
        terminos_y_condiciones: false,
        tipo_documento_id: '',
        numero_documento: '',
        nacionalidad: '',
        fecha_nacimiento: '',
        numero_pasaporte: '',
        fecha_emision_pasaporte: '',
        fecha_caducidad_pasaporte: '',
        imagen_pasaporte: '',
        restriccion_alimentaria: ''
    };

    const initialAcompananteState = {
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        tipo_documento_id: '',
        numero_documento: '',
        fecha_nacimiento: '',
        numero_celular: '',
        numero_pasaporte: '',
        fecha_emision_pasaporte: '',
        fecha_caducidad_pasaporte: '',
        imagen_pasaporte: '',
        solicitud_especial: '',
        restriccion_alimentaria: ''
    };

    // Estados principales
    const [formData, setFormData] = useState(initialFormState);
    const [tiene_acompanante, setTieneAcompanante] = useState(false);
    const [acompanante, setAcompanante] = useState(initialAcompananteState);
    const [dataLists, setDataLists] = useState<DataLists>({
        regionales: [],
        jefes_zona: [],
        departamentos: [],
        ciudades: [],
        formas_pago: [],
        tipos_documento: [],
        acomodaciones: [],
        extensiones: []
    });

    // Estados para control de UI
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [showPolicy, setShowPolicy] = useState(false);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [sectionValidation, setSectionValidation] = useState([false, false, false, false, false, true]);

    // Definición de los pasos del formulario
    const steps = [
        { title: "Información General", icon: <ClipboardListIcon className="w-5 h-5" /> },
        { title: "Información Personal", icon: <User className="w-5 h-5" /> },
        { title: "Dirección", icon: <Home className="w-5 h-5" /> },
        { title: "Pasaporte", icon: <TicketsPlane className="w-5 h-5" /> },
        { title: "Preferencias", icon: <Settings className="w-5 h-5" /> },
        { title: "Confirmación", icon: <Check className="w-5 h-5" /> }
    ];

    const router = useRouter();
    // Función para cargar datos iniciales
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const data = await fetchInitialData();
                setDataLists({
                    regionales: data.regionales || [],
                    departamentos: data.departamentos || [],
                    formas_pago: data.formasPago || [],
                    tipos_documento: data.tiposDocumento || [],
                    jefes_zona: [],
                    acomodaciones: data.acomodaciones || [],
                    extensiones: data.extensiones?.filter((ext: { nombre: string }) => ext.nombre !== 'Pre') || [],
                    ciudades: []
                });

                console.log(data)
            } catch (err) {
                setError('Error al cargar datos. Intenta nuevamente.');
                console.log(err)
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        if (formData.regional_id) {
            fetchJefesZona(formData.regional_id)
                .then(jefes => {
                    console.log('Jefes de zona cargados:', jefes);
                    setDataLists(prev => ({ ...prev, jefes_zona: jefes }));
                })
                .catch(err => {
                    console.error('Error cargando Jefes de Zona:', err);
                    setDataLists(prev => ({ ...prev, jefes_zona: [] }));
                });
        }
    }, [formData.regional_id]);



    // Cargar ciudades cuando cambia el departamento
    useEffect(() => {
        if (formData.departamento_id) {
            fetchCiudades(formData.departamento_id)
                .then(ciudades => setDataLists(prev => ({ ...prev, ciudades: ciudades })))
                .catch(() => setDataLists(prev => ({ ...prev, ciudades: [] })));
        }
    }, [formData.departamento_id]);

    const isStepValid = useCallback((step: number): boolean => {
        switch (step) {
            case 0: // Información General
                return !!(formData.regional_id && formData.jefe_de_zona_id && formData.name_eds && formData.razon_social);
            case 1: // Información Personal
                return !!(
                    formData.tipo_documento_id &&
                    formData.numero_documento &&
                    formData.primer_nombre &&
                    formData.primer_apellido &&
                    formData.nacionalidad &&
                    formData.fecha_nacimiento &&
                    formData.email &&
                    formData.celular &&
                    formData.celular.replace(/\D/g, '').length >= 7 &&
                    formData.celular.replace(/\D/g, '').length <= 10
                );
            case 2: // Dirección
                return !!(formData.departamento_id && formData.ciudad_id);
            case 3: // Pasaporte
                return !!(
                    formData.numero_pasaporte &&
                    formData.fecha_emision_pasaporte &&
                    formData.fecha_caducidad_pasaporte &&
                    formData.imagen_pasaporte
                );
            case 4: // Preferencias
                if (!formData.acomodacion_id || !formData.extension_id || !formData.forma_de_pago_id) {
                    return false;
                }
                if (tiene_acompanante) {
                    return !!(
                        acompanante.primer_nombre &&
                        acompanante.primer_apellido &&
                        acompanante.tipo_documento_id &&
                        acompanante.numero_documento &&
                        acompanante.fecha_nacimiento &&
                        acompanante.numero_celular &&
                        acompanante.numero_pasaporte &&
                        acompanante.fecha_emision_pasaporte &&
                        acompanante.fecha_caducidad_pasaporte &&
                        acompanante.imagen_pasaporte
                    );
                }
                return true;
            case 5: // Confirmación
                return !!formData.terminos_y_condiciones;
            default:
                return true;
        }
    }, [formData, tiene_acompanante, acompanante]);


    const updateSectionValidation = useCallback(() => {
        const newSectionValidation = [...sectionValidation];

        // Validar cada sección sin mostrar errores
        for (let i = 0; i < steps.length; i++) {
            newSectionValidation[i] = isStepValid(i);
        }

        setSectionValidation(newSectionValidation);
    }, [sectionValidation, steps.length, isStepValid]); // Include isStepValid in dependencies

    // Define the allowed field names for type safety
    type FieldName = 'celular' | 'numero_celular' | 'email' | 'numero_documento' | 'numero_pasaporte' | string;

    const validateField = useCallback((name: FieldName, value: string): boolean => {
        const errors: ValidationErrors = { ...validationErrors };

        // Limpiar error previo para este campo
        delete errors[name];

        // Validaciones específicas por nombre de campo
        switch (name) {
            case 'celular':
            case 'numero_celular':
                if (value) {
                    const digits = value.replace(/\D/g, '');
                    const isAcompanante = name === 'numero_celular';
                    const errorKey = isAcompanante ? `acompanante.${name}` : name;

                    if (digits.length < 7 || digits.length > 10) {
                        errors[errorKey] = 'El número debe tener entre 7 y 10 dígitos.';
                    }
                }
                break;

            case 'email':
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    errors[name] = 'Ingrese un correo electrónico válido.';
                }
                break;

            // Puedes agregar más validaciones específicas según sea necesario
            case 'numero_documento':
            case 'numero_pasaporte':
                if (value && value.length < 4) {
                    errors[name] = 'Ingrese un número válido (mínimo 4 caracteres).';
                }
                break;
        }

        setValidationErrors(errors);

        // Actualizar el estado de validación de las secciones
        updateSectionValidation();

        return Object.keys(errors).length === 0;
    }, [validationErrors, updateSectionValidation]);

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            const fileInput = e.target as HTMLInputElement;
            if (fileInput.files && fileInput.files.length > 0) {

                const filename = fileInput.files[0].name;
                setFormData(prev => ({ ...prev, [name]: filename }));
                validateField(name, filename);
            }
        } else if (type === 'checkbox') {
            const checkboxInput = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checkboxInput.checked }));
            validateField(name, String(checkboxInput.checked));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
            validateField(name, value);
        }
    }, [validateField]);

    const handleAcompananteChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            const fileInput = e.target as HTMLInputElement;
            if (fileInput.files && fileInput.files.length > 0) {

                const filename = fileInput.files[0].name;
                setAcompanante(prev => ({ ...prev, [name]: filename }));
                validateField(name, filename);
            }
        } else if (type === 'checkbox') {
            const checkboxInput = e.target as HTMLInputElement;
            setAcompanante(prev => ({ ...prev, [name]: checkboxInput.checked }));
            validateField(name, String(checkboxInput.checked));
        } else {
            setAcompanante(prev => ({ ...prev, [name]: value }));
            validateField(name, value);
        }
    }, [validateField]);

    const validateSection = (step: number): boolean => {
        let isValid = true;
        const errors: Record<string, string> = {};

        switch (step) {
            case 0: // Información General
                if (!formData.regional_id) {
                    errors.regional_id = 'La regional es obligatoria';
                    isValid = false;
                }
                if (!formData.jefe_de_zona_id && formData.regional_id) {
                    errors.jefe_de_zona_id = 'El jefe de zona es obligatorio';
                    isValid = false;
                }
                if (!formData.name_eds) {
                    errors.name_eds = 'El nombre de EDS es obligatorio';
                    isValid = false;
                }
                if (!formData.razon_social) {
                    errors.razon_social = 'La razón social es obligatoria';
                    isValid = false;
                }
                break;

            case 1: // Información Personal
                if (!formData.tipo_documento_id) {
                    errors.tipo_documento_id = 'El tipo de documento es obligatorio';
                    isValid = false;
                }
                if (!formData.numero_documento) {
                    errors.numero_documento = 'El número de documento es obligatorio';
                    isValid = false;
                }
                if (!formData.primer_nombre) {
                    errors.primer_nombre = 'El primer nombre es obligatorio';
                    isValid = false;
                }
                if (!formData.primer_apellido) {
                    errors.primer_apellido = 'El primer apellido es obligatorio';
                    isValid = false;
                }
                if (!formData.nacionalidad) {
                    errors.nacionalidad = 'La nacionalidad es obligatoria';
                    isValid = false;
                }
                if (!formData.fecha_nacimiento) {
                    errors.fecha_nacimiento = 'La fecha de nacimiento es obligatoria';
                    isValid = false;
                }
                if (!formData.email) {
                    errors.email = 'El correo electrónico es obligatorio';
                    isValid = false;
                }
                if (!formData.celular) {
                    errors.celular = 'El celular es obligatorio';
                    isValid = false;
                } else {
                    const celularDigits = formData.celular.replace(/\D/g, '');
                    if (celularDigits.length < 7 || celularDigits.length > 10) {
                        errors.celular = 'El celular debe tener entre 7 y 10 dígitos.';
                        isValid = false;
                    }
                }
                break;

            case 2: // Dirección
                if (!formData.departamento_id) {
                    errors.departamento_id = 'El departamento es obligatorio';
                    isValid = false;
                }
                if (!formData.ciudad_id && formData.departamento_id) {
                    errors.ciudad_id = 'La ciudad es obligatoria';
                    isValid = false;
                }
                break;

            case 3: // Pasaporte
                if (!formData.numero_pasaporte) {
                    errors.numero_pasaporte = 'El número de pasaporte es obligatorio';
                    isValid = false;
                }
                if (!formData.fecha_emision_pasaporte) {
                    errors.fecha_emision_pasaporte = 'La fecha de emisión es obligatoria';
                    isValid = false;
                }
                if (!formData.fecha_caducidad_pasaporte) {
                    errors.fecha_caducidad_pasaporte = 'La fecha de caducidad es obligatoria';
                    isValid = false;
                }
                if (!formData.imagen_pasaporte) {
                    errors.imagen_pasaporte = 'La imagen del pasaporte es obligatoria';
                    isValid = false;
                }
                break;

            case 4: // Preferencias
                if (!formData.acomodacion_id) {
                    errors.acomodacion_id = 'La acomodación es obligatoria';
                    isValid = false;
                }
                if (!formData.extension_id) {
                    errors.extension_id = 'La extensión es obligatoria';
                    isValid = false;
                }
                if (!formData.forma_de_pago_id) {
                    errors.forma_de_pago_id = 'La forma de pago es obligatoria';
                    isValid = false;
                }

                // Validar datos del acompañante si tiene
                if (tiene_acompanante) {
                    if (!acompanante.primer_nombre) {
                        errors['acompanante.primer_nombre'] = 'El primer nombre del acompañante es obligatorio';
                        isValid = false;
                    }
                    if (!acompanante.primer_apellido) {
                        errors['acompanante.primer_apellido'] = 'El primer apellido del acompañante es obligatorio';
                        isValid = false;
                    }
                    if (!acompanante.tipo_documento_id) {
                        errors['acompanante.tipo_documento_id'] = 'El tipo de documento del acompañante es obligatorio';
                        isValid = false;
                    }
                    if (!acompanante.numero_documento) {
                        errors['acompanante.numero_documento'] = 'El número de documento del acompañante es obligatorio';
                        isValid = false;
                    }
                    if (!acompanante.fecha_nacimiento) {
                        errors['acompanante.fecha_nacimiento'] = 'La fecha de nacimiento del acompañante es obligatoria';
                        isValid = false;
                    }
                    if (!acompanante.numero_celular) {
                        errors['acompanante.numero_celular'] = 'El celular del acompañante es obligatorio';
                        isValid = false;
                    }
                    if (!acompanante.numero_pasaporte) {
                        errors['acompanante.numero_pasaporte'] = 'El número de pasaporte del acompañante es obligatorio';
                        isValid = false;
                    }
                    if (!acompanante.fecha_emision_pasaporte) {
                        errors['acompanante.fecha_emision_pasaporte'] = 'La fecha de emisión del pasaporte es obligatoria';
                        isValid = false;
                    }
                    if (!acompanante.fecha_caducidad_pasaporte) {
                        errors['acompanante.fecha_caducidad_pasaporte'] = 'La fecha de caducidad del pasaporte es obligatoria';
                        isValid = false;
                    }
                    if (!acompanante.imagen_pasaporte) {
                        errors['acompanante.imagen_pasaporte'] = 'La imagen del pasaporte es obligatoria';
                        isValid = false;
                    }
                }
                break;

            case 5: // Confirmación
                if (!formData.terminos_y_condiciones) {
                    errors.terminos_y_condiciones = 'Debes aceptar los términos y condiciones';
                    isValid = false;
                }
                break;
        }

        setValidationErrors(errors);

        // Actualizar estado de validación de la sección
        const newSectionValidation = [...sectionValidation];
        newSectionValidation[step] = isValid;
        setSectionValidation(newSectionValidation);

        return isValid;
    };

    // Navegación entre pasos
    const nextStep = () => {
        if (validateSection(currentStep)) {
            const newStep = Math.min(currentStep + 1, steps.length - 1);
            setCurrentStep(newStep);
        }
    };
    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    const goToStep = (step: number) => {
        if (step <= currentStep || sectionValidation[step]) {
            setCurrentStep(step);
        }
    };

    const validateForm = () => {
        let hasErrors = false;
        let firstErrorStep = null;

        // Validate all sections except the final confirmation (which is handled separately)
        for (let i = 0; i < steps.length - 1; i++) {
            if (!validateSection(i)) {
                hasErrors = true;
                if (firstErrorStep === null) {
                    firstErrorStep = i;
                }
            }
        }

        // If there are errors, navigate to the first section with errors
        if (hasErrors && firstErrorStep !== null) {
            setCurrentStep(firstErrorStep);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Previene la recarga de la página

        // Validar la sección final (términos y condiciones)
        if (!validateSection(5)) {
            setError('Por favor acepta los términos y condiciones antes de enviar.');
            return;
        }

        // Validar el formulario completo
        if (!validateForm()) {
            setError('Por favor completa todos los campos obligatorios antes de enviar.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Calcular nombre completo
            const nombre_completo = `${formData.primer_nombre} ${formData.segundo_nombre || ''} ${formData.primer_apellido} ${formData.segundo_apellido || ''}`
                .trim()
                .replace(/\s+/g, ' ');

            // Si formFiles.imagen_pasaporte es null, simplemente usamos null directamente
            const imagen_pasaporte = null;

            // Construir el objeto `FormDataType`
            const formDataToSubmit: FormDataType = {
                ...formData,
                nombre_completo,
                tiene_acompanante: tiene_acompanante, // Asegúrate de incluir este campo explícitamente
                terminos_y_condiciones: !!formData.terminos_y_condiciones,
                imagen_pasaporte 
            };

            // Incluir datos del acompañante si aplica
            if (tiene_acompanante) {
                formDataToSubmit.acompanante = {
                    ...acompanante,
                    imagen_pasaporte: null, // Si acompananteFiles.imagen_pasaporte también es null
                };
            }

            // Enviar los datos al backend
            await registerUser(formDataToSubmit);

            setSuccess(true);

            // Redireccionar a la página de agradecimiento
            setTimeout(() => {
                router.push('/formulario/thankful');
            }, 1500);

        } catch (err: unknown) {
            const apiError = err as ApiError;
            console.error('Error al enviar el formulario:', apiError);

            if (apiError.errors) {
                setValidationErrors(apiError.errors);

                const firstErrorKey = Object.keys(apiError.errors)[0];
                const firstErrorValue = apiError.errors[firstErrorKey];
                setError(`${firstErrorValue}`);
            } else {
                setError('Error al enviar el formulario. Por favor, verifica los datos e intenta nuevamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    const getFieldError = (fieldName: string): string => {
        return validationErrors[fieldName] || '';
    };
    // 
    // Barras de progreso y animaciones
    const progressPercent = ((currentStep + 1) / steps.length) * 100;

    const formVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 }
    };

    // Renderizado condicional de cada paso
    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <motion.div
                        key="step1"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <h2 className="text-xl font-semibold text-gray-800">Información General</h2>
                        <p className="text-gray-600">Complete la información básica sobre su EDS y regional.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SelectField
                                label="Regional"
                                name="regional_id"
                                options={dataLists.regionales}
                                value={formData.regional_id}
                                onChange={handleInputChange}
                                required
                                error={getFieldError('regional_id')}
                            />
                            <SelectField
                                label="Jefe de Zona"
                                name="jefe_de_zona_id"
                                options={dataLists.jefes_zona}
                                value={formData.jefe_de_zona_id}
                                onChange={handleInputChange}
                                required
                                disabled={!formData.regional_id}
                                error={getFieldError('jefe_de_zona_id')}
                            />
                            <InputField
                                label="Nombre EDS"
                                name="name_eds"
                                value={formData.name_eds}
                                onChange={handleInputChange}
                                required
                                error={getFieldError('name_eds')}
                            />
                            <InputField
                                label="Razón Social"
                                name="razon_social"
                                value={formData.razon_social}
                                onChange={handleInputChange}
                                required
                                error={getFieldError('razon_social')}
                            />
                        </div>
                    </motion.div>
                );

            case 1:
                return (
                    <motion.div
                        key="step2"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <h2 className="text-xl font-semibold text-gray-800">Información Personal</h2>
                        <p className="text-gray-600">Complete sus datos personales.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SelectField
                                label="Tipo de Documento"
                                name="tipo_documento_id"
                                options={dataLists.tipos_documento}
                                value={formData.tipo_documento_id}
                                onChange={handleInputChange}
                                required
                                error={getFieldError('tipo_documento_id')}
                            />
                            <InputField
                                label="Número de Documento"
                                name="numero_documento"
                                value={formData.numero_documento}
                                onChange={handleInputChange}
                                required
                                error={getFieldError('numero_documento')}
                            />
                            <InputField
                                label="Primer Nombre"
                                name="primer_nombre"
                                value={formData.primer_nombre}
                                onChange={handleInputChange}
                                required
                                error={getFieldError('primer_nombre')}
                            />
                            <InputField
                                label="Segundo Nombre"
                                name="segundo_nombre"
                                value={formData.segundo_nombre}
                                onChange={handleInputChange}
                                error={getFieldError('segundo_nombre')}
                            />
                            <InputField
                                label="Primer Apellido"
                                name="primer_apellido"
                                value={formData.primer_apellido}
                                onChange={handleInputChange}
                                required
                                error={getFieldError('primer_apellido')}
                            />
                            <InputField
                                label="Segundo Apellido"
                                name="segundo_apellido"
                                value={formData.segundo_apellido}
                                onChange={handleInputChange}
                                error={getFieldError('segundo_apellido')}
                            />
                            <InputField
                                label="Nacionalidad"
                                name="nacionalidad"
                                value={formData.nacionalidad}
                                onChange={handleInputChange}
                                required
                                error={getFieldError('nacionalidad')}
                            />
                            <DateField
                                label="Fecha de Nacimiento"
                                name="fecha_nacimiento"
                                value={formData.fecha_nacimiento}
                                onChange={handleInputChange}
                                required
                                error={getFieldError('fecha_nacimiento')}
                            />
                            <InputField
                                label="Correo Electrónico"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                type="email"
                                error={getFieldError('email')}
                            />
                            <InputField
                                label="Celular"
                                name="celular"
                                value={formData.celular}
                                onChange={handleInputChange}
                                required
                                error={getFieldError('celular')}
                                placeholder="Entre 7 y 10 dígitos"
                            />
                        </div>
                    </motion.div>
                );

            case 2:
                return (
                    <motion.div
                        key="step3"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <h2 className="text-xl font-semibold text-gray-800">Información de Residencia</h2>
                        <p className="text-gray-600">Indique su lugar de residencia.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SelectField
                                label="Departamento"
                                name="departamento_id"
                                options={dataLists.departamentos}
                                value={formData.departamento_id}
                                onChange={handleInputChange}
                                required
                                error={getFieldError('departamento_id')}
                            />
                            <SelectField
                                label="Ciudad"
                                name="ciudad_id"
                                options={dataLists.ciudades}
                                value={formData.ciudad_id}
                                onChange={handleInputChange}
                                required
                                disabled={!formData.departamento_id}
                                error={getFieldError('ciudad_id')}
                            />
                        </div>
                    </motion.div>
                );

            case 3:
                return (
                    <motion.div
                        key="step4"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <h2 className="text-xl font-semibold text-gray-800">Información de Pasaporte</h2>
                        <p className="text-gray-600">Complete los datos de su pasaporte.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Número de Pasaporte"
                                name="numero_pasaporte"
                                value={formData.numero_pasaporte}
                                onChange={handleInputChange}
                                required
                                error={getFieldError('numero_pasaporte')}
                            />
                            <DateField
                                label="Fecha de Emisión"
                                name="fecha_emision_pasaporte"
                                value={formData.fecha_emision_pasaporte}
                                onChange={handleInputChange}
                                required
                                error={getFieldError('fecha_emision_pasaporte')}
                            />
                            <DateField
                                label="Fecha de Caducidad"
                                name="fecha_caducidad_pasaporte"
                                value={formData.fecha_caducidad_pasaporte}
                                onChange={handleInputChange}
                                required
                                error={getFieldError('fecha_caducidad_pasaporte')}
                            />
                            <div className="md:col-span-2">
                                <FileUploadField
                                    label="Imagen del Pasaporte"
                                    name="imagen_pasaporte"
                                    onChange={(e) => handleInputChange(e as ChangeEvent<HTMLInputElement>)}
                                    required
                                    error={getFieldError('imagen_pasaporte')}
                                    accept="image/*"
                                    helperText="Archivo de imagen, max 255 caracteres para la ruta"
                                />
                            </div>
                        </div>
                    </motion.div>
                );

            // En el case 4 del renderStep, modifica para incluir campos del acompañante
            case 4:
                return (
                    <motion.div
                        key="step5"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <h2 className="text-xl font-semibold text-gray-800">Preferencias y Solicitudes</h2>
                        <p className="text-gray-600">Seleccione sus preferencias y si viajará con acompañante.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SelectField
                                label="Acomodación"
                                name="acomodacion_id"
                                options={dataLists.acomodaciones}
                                value={formData.acomodacion_id}
                                onChange={handleInputChange}
                                required
                                error={getFieldError('acomodacion_id')}
                            />
                            <SelectField
                                label="Extensión"
                                name="extension_id"
                                options={dataLists.extensiones}
                                value={formData.extension_id}
                                onChange={handleInputChange}
                                required
                                error={getFieldError('extension_id')}
                            />
                            <SelectField
                                label="Forma de Pago"
                                name="forma_de_pago_id"
                                options={dataLists.formas_pago}
                                value={formData.forma_de_pago_id}
                                onChange={handleInputChange}
                                required
                                error={getFieldError('forma_de_pago_id')}
                            />
                            <InputField
                                label="Restricción Alimentaria"
                                name="restriccion_alimentaria"
                                value={formData.restriccion_alimentaria}
                                onChange={handleInputChange}
                                error={getFieldError('restriccion_alimentaria')}
                            />
                            <InputField
                                label="Solicitud Especial"
                                name="solicitud_especial"
                                value={formData.solicitud_especial}
                                onChange={handleInputChange}
                                error={getFieldError('solicitud_especial')}
                            />
                            <div className="md:col-span-2">
                                <CheckboxField
                                    label="¿Viaja con acompañante?"
                                    name="tiene_acompanante"
                                    checked={tiene_acompanante}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTieneAcompanante(e.target.checked)}
                                    error={getFieldError('tiene_acompanante')}
                                />
                            </div>

                            {/* Campos del acompañante - Solo mostrar si tiene_acompanante es true */}
                            {tiene_acompanante && (
                                <div className="md:col-span-2 mt-6 border-t pt-6">
                                    <h3 className="text-lg font-semibold mb-4">Información del Acompañante</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputField
                                            label="Primer Nombre"
                                            name="primer_nombre"
                                            value={acompanante.primer_nombre}
                                            onChange={handleAcompananteChange}
                                            required
                                            error={getFieldError('acompanante.primer_nombre')}
                                        />
                                        <InputField
                                            label="Segundo Nombre"
                                            name="segundo_nombre"
                                            value={acompanante.segundo_nombre}
                                            onChange={handleAcompananteChange}
                                            error={getFieldError('acompanante.segundo_nombre')}
                                        />
                                        <InputField
                                            label="Primer Apellido"
                                            name="primer_apellido"
                                            value={acompanante.primer_apellido}
                                            onChange={handleAcompananteChange}
                                            required
                                            error={getFieldError('acompanante.primer_apellido')}
                                        />
                                        <InputField
                                            label="Segundo Apellido"
                                            name="segundo_apellido"
                                            value={acompanante.segundo_apellido}
                                            onChange={handleAcompananteChange}
                                            error={getFieldError('acompanante.segundo_apellido')}
                                        />
                                        <SelectField
                                            label="Tipo de Documento"
                                            name="tipo_documento_id"
                                            options={dataLists.tipos_documento}
                                            value={acompanante.tipo_documento_id}
                                            onChange={handleAcompananteChange}
                                            required
                                            error={getFieldError('acompanante.tipo_documento_id')}
                                        />
                                        <InputField
                                            label="Número de Documento"
                                            name="numero_documento"
                                            value={acompanante.numero_documento}
                                            onChange={handleAcompananteChange}
                                            required
                                            error={getFieldError('acompanante.numero_documento')}
                                        />
                                        <DateField
                                            label="Fecha de Nacimiento"
                                            name="fecha_nacimiento"
                                            value={acompanante.fecha_nacimiento}
                                            onChange={handleAcompananteChange}
                                            required
                                            error={getFieldError('acompanante.fecha_nacimiento')}
                                        />
                                        <InputField
                                            label="Número Celular"
                                            name="numero_celular"
                                            value={acompanante.numero_celular}
                                            onChange={handleAcompananteChange}
                                            required
                                            error={getFieldError('acompanante.numero_celular')}
                                            placeholder="Entre 7 y 10 dígitos"
                                        />
                                        <InputField
                                            label="Número de Pasaporte"
                                            name="numero_pasaporte"
                                            value={acompanante.numero_pasaporte}
                                            onChange={handleAcompananteChange}
                                            required
                                            error={getFieldError('acompanante.numero_pasaporte')}
                                        />
                                        <DateField
                                            label="Fecha de Emisión"
                                            name="fecha_emision_pasaporte"
                                            value={acompanante.fecha_emision_pasaporte}
                                            onChange={handleAcompananteChange}
                                            required
                                            error={getFieldError('acompanante.fecha_emision_pasaporte')}
                                        />
                                        <DateField
                                            label="Fecha de Caducidad"
                                            name="fecha_caducidad_pasaporte"
                                            value={acompanante.fecha_caducidad_pasaporte}
                                            onChange={handleAcompananteChange}
                                            required
                                            error={getFieldError('acompanante.fecha_caducidad_pasaporte')}
                                        />
                                        <div className="md:col-span-2">
                                            <FileUploadField
                                                label="Imagen del Pasaporte"
                                                name="imagen_pasaporte"
                                                onChange={(e) => handleAcompananteChange(e as ChangeEvent<HTMLInputElement>)}
                                                required
                                                error={getFieldError('acompanante.imagen_pasaporte')}
                                                accept="image/*"
                                                helperText="Archivo de imagen, max 255 caracteres para la ruta"
                                            />
                                        </div>
                                        <InputField
                                            label="Restricción Alimentaria"
                                            name="restriccion_alimentaria"
                                            value={acompanante.restriccion_alimentaria}
                                            onChange={handleAcompananteChange}
                                            error={getFieldError('acompanante.restriccion_alimentaria')}
                                        />
                                        <InputField
                                            label="Solicitud Especial"
                                            name="solicitud_especial"
                                            value={acompanante.solicitud_especial}
                                            onChange={handleAcompananteChange}
                                            error={getFieldError('acompanante.solicitud_especial')}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                );

            case 5:
                return (
                    <motion.div
                        key="step6"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <h2 className="text-xl font-semibold text-gray-800">Confirmación</h2>
                        <p className="text-gray-600">Revise sus datos y confirme el registro.</p>

                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
                            <h3 className="text-lg font-medium text-gray-800">Resumen de registro</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                <div>
                                    <span className="font-medium">Nombre completo:</span>
                                    <span className="ml-2">{`${formData.primer_nombre} ${formData.segundo_nombre || ''} ${formData.primer_apellido} ${formData.segundo_apellido || ''}`.trim()}</span>
                                </div>
                                <div>
                                    <span className="font-medium">EDS:</span>
                                    <span className="ml-2">{formData.name_eds}</span>
                                </div>
                                <div>
                                    <span className="font-medium">Email:</span>
                                    <span className="ml-2">{formData.email}</span>
                                </div>
                                <div>
                                    <span className="font-medium">Celular:</span>
                                    <span className="ml-2">{formData.celular}</span>
                                </div>
                                <div>
                                    <span className="font-medium">Pasaporte:</span>
                                    <span className="ml-2">{formData.numero_pasaporte}</span>
                                </div>
                                <div>
                                    <span className="font-medium">Acomodación:</span>
                                    <span className="ml-2">
                                        {dataLists.acomodaciones.find(item => item.id === formData.acomodacion_id)?.nombre || ''}
                                    </span>                                </div>
                                {tiene_acompanante && (
                                    <div className="md:col-span-2 mt-4">
                                        <h4 className="font-medium text-gray-700">Información del Acompañante:</h4>
                                        <div className="ml-4 mt-2">
                                            <div>
                                                <span className="font-medium">Nombre:</span>
                                                <span className="ml-2">{`${acompanante.primer_nombre} ${acompanante.segundo_nombre || ''} ${acompanante.primer_apellido} ${acompanante.segundo_apellido || ''}`.trim()}</span>
                                            </div>
                                            <div>
                                                <span className="font-medium">Pasaporte:</span>
                                                <span className="ml-2">{acompanante.numero_pasaporte}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-4">
                            <CheckboxField
                                label="Acepto los términos y condiciones"
                                name="terminos_y_condiciones"
                                checked={formData.terminos_y_condiciones}
                                onChange={handleInputChange}
                                required
                                onClick={() => setShowPolicy(true)}
                                error={getFieldError('terminos_y_condiciones')}
                            />
                        </div>
                    </motion.div>
                );

            default:
                return null;
        }
    };

    const getStepErrorCount = (step: 0 | 1) => {
        let count = 0;
        const errorKeys = Object.keys(validationErrors);

        const stepFields = {
            0: ['regional_id', 'jefe_de_zona_id', 'name_eds', 'razon_social'],
            1: ['tipo_documento_id', 'numero_documento', 'primer_nombre', 'segundo_nombre',
                'primer_apellido', 'segundo_apellido', 'nacionalidad', 'fecha_nacimiento', 'email', 'celular'],
        };

        errorKeys.forEach(key => {
            if (stepFields[step] && stepFields[step].includes(key)) {
                count++;
            }
        });

        return count;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12" style={{ background: 'url(/recursos/back_blue.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: '0.9' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg border overflow-hidden">
                    <div className=" text-gray-500 p-6 text-center">
                        <h1 className="text-1xl font-medium">PRE-REGISTRO</h1>
                    </div>

                    {/* Indicador de progreso */}
                    <div className="px-6 pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                                Paso {currentStep + 1} de {steps.length}
                            </span>
                            <span className="text-sm font-medium text-gray-700">
                                {Math.round(progressPercent)}% Completado
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>

                        {/* Navegación por pasos */}
                        <div className="flex flex-wrap justify-between mt-6 mb-4">
                            {steps.map((step, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToStep(index)}
                                    className={`flex flex-col items-center p-2 transition-colors rounded-md ${index === currentStep
                                        ? 'text-red-600 font-medium'
                                        : index < currentStep || sectionValidation[index]
                                            ? 'text-gray-700 hover:text-red-500'
                                            : 'text-gray-400 cursor-not-allowed'
                                        }`}
                                    disabled={index > currentStep && !sectionValidation[index]}
                                >
                                    <div className="mb-1">{step.icon}</div>
                                    <span className="text-xs">{step.title}</span>
                                    {(index < currentStep || sectionValidation[index]) && (
                                        <div className="mt-1 h-1 w-1 rounded-full bg-green-500"></div>
                                    )}
                                    {validationErrors && Object.keys(validationErrors).length > 0 &&
                                        (index === 0 || index === 1) && getStepErrorCount(index) > 0 && (
                                            <div className="mt-1 h-1 w-1 rounded-full bg-red-500"></div>
                                        )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mensajes de éxito o error */}
                    <AnimatePresence>
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-green-100 text-green-700 px-4 py-3 m-6 rounded"
                            >
                                ¡Registro completado con éxito!
                            </motion.div>
                        )}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-red-100 text-red-700 px-4 py-3 m-6 rounded"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {showPolicy && <PDFViewer url="/politica-privacidad.pdf" onClose={() => setShowPolicy(false)} />}

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="p-6">
                        <AnimatePresence mode="wait">
                            {renderStep()}
                        </AnimatePresence>

                        {/* Botones de navegación */}
                        <div className="mt-8 flex justify-between">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className={`px-6 py-2 rounded-md transition-colors ${currentStep === 0
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                Anterior
                            </button>

                            {currentStep < steps.length - 1 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                >
                                    Siguiente
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                >
                                    {loading ? 'Enviando...' : 'Enviar Registro'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}