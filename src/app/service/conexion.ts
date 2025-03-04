import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
const API_URL = 'https://api.convenciondealiadosterpel.com/api';
const DEFAULT_TIMEOUT = 30000; 
const CACHE_DURATION = 5 * 60 * 100000; 

// Interfaces para respuestas de API
interface ApiErrorResponse {
    errors?: Record<string, string>;
    message?: string;
}

// Interfaces de datos según `page.tsx`
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
    // Nuevos campos de dirección para el acompañante
    departamento_id: string;
    ciudad_id: string;
    direccion: string;
}

interface UserData {
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
    direccion: string;
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

// Sistema de caché con expiración
interface CacheItem<T> {
    data: T;
    timestamp: number;
}

class ApiCache {
    private cache: Map<string, CacheItem<unknown>> = new Map();
    private cacheDuration: number;

    constructor(cacheDuration: number = CACHE_DURATION) {
        this.cacheDuration = cacheDuration;
    }

    get<T>(key: string): T | null {
        const item = this.cache.get(key);
        if (!item) return null;

        const now = Date.now();
        if (now - item.timestamp > this.cacheDuration) {
            this.cache.delete(key);
            return null;
        }

        return item.data as T;
    }

    set<T>(key: string, data: T): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    clear(): void {
        this.cache.clear();
    }

    clearKey(key: string): void {
        this.cache.delete(key);
    }
}

// Clase principal de API
class ApiService {
    private client: AxiosInstance;
    private cache: ApiCache;

    constructor() {
        this.client = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: DEFAULT_TIMEOUT
        });

        this.cache = new ApiCache();

        // Interceptor para loguear peticiones
        this.client.interceptors.request.use(config => {
            console.log(`Realizando petición a: ${config.url}`);
            return config;
        });

        // Interceptor para loguear respuestas y manejar errores
        this.client.interceptors.response.use(
            response => {
                console.log(`Respuesta de ${response.config.url}: Status ${response.status}`);
                return response;
            },
            error => {
                // Mejorado el logging de errores para incluir más información
                if (axios.isAxiosError(error)) {
                    const url = error.config?.url || 'unknown endpoint';
                    
                    if (error.code === 'ECONNABORTED') {
                        console.error(`Timeout en petición a ${url}. Considere aumentar el tiempo de espera.`);
                    } else {
                        console.error(`Error en petición a ${url}:`, error.message);
                        if (error.response) {
                            console.error(`Status: ${error.response.status}, Data:`, error.response.data);
                        }
                    }
                } else {
                    console.error('Error no relacionado con Axios:', error);
                }
                
                return Promise.reject(error);
            }
        );
    }

    // Método para crear una configuración con timeout personalizado
    private createConfig(config?: AxiosRequestConfig, customTimeout?: number): AxiosRequestConfig {
        return {
            ...config,
            timeout: customTimeout || config?.timeout || DEFAULT_TIMEOUT
        };
    }

    // Método genérico para peticiones GET con caché y retry
    async get<T>(
        url: string, 
        config?: AxiosRequestConfig, 
        useCache: boolean = true,
        retryCount: number = 1,
        retryDelay: number = 1000,
        customTimeout?: number
    ): Promise<T> {
        const cacheKey = url;
        
        if (useCache) {
            const cachedData = this.cache.get<T>(cacheKey);
            if (cachedData) {
                console.log(`Usando datos en caché para: ${url}`);
                return cachedData;
            }
        }

        const requestConfig = this.createConfig(config, customTimeout);
        
        try {
            const response = await this.client.get<T>(url, requestConfig);
            
            if (useCache) {
                this.cache.set(cacheKey, response.data);
            }
            
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ApiErrorResponse>;
            
            // Si es un error de timeout y hay intentos restantes, reintentamos
            if (axiosError.code === 'ECONNABORTED' && retryCount > 0) {
                console.log(`Reintentando petición a ${url} después de ${retryDelay}ms. Intentos restantes: ${retryCount}`);
                
                // Esperamos antes de reintentar
                await new Promise(resolve => setTimeout(resolve, retryDelay));
                
                // Aumentamos el timeout en cada reintento
                const newTimeout = (requestConfig.timeout as number) * 1.5;
                
                // Reintentamos con timeout extendido
                return this.get<T>(
                    url, 
                    config, 
                    useCache, 
                    retryCount - 1, 
                    retryDelay * 2,
                    newTimeout
                );
            }
            
            console.error(`Error en petición GET a ${url}:`, axiosError);
            
            if (axiosError.response?.data) {
                throw axiosError.response.data;
            }
            
            throw new Error(`Error al realizar petición a ${url}: ${axiosError.message}`);
        }
    }

    // Método genérico para peticiones POST con retry
    async post<T>(
        url: string, 
        data: FormData | Record<string, unknown>, 
        config?: AxiosRequestConfig,
        retryCount: number = 1,
        retryDelay: number = 1000,
        customTimeout?: number
    ): Promise<T> {
        const requestConfig = this.createConfig(config, customTimeout);
        
        try {
            const response = await this.client.post<T>(url, data, requestConfig);
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ApiErrorResponse>;
            
            // Si es un error de timeout y hay intentos restantes, reintentamos
            if (axiosError.code === 'ECONNABORTED' && retryCount > 0) {
                console.log(`Reintentando petición POST a ${url} después de ${retryDelay}ms. Intentos restantes: ${retryCount}`);
                
                // Esperamos antes de reintentar
                await new Promise(resolve => setTimeout(resolve, retryDelay));
                
                // Aumentamos el timeout en cada reintento
                const newTimeout = (requestConfig.timeout as number) * 1.5;
                
                // Reintentamos con timeout extendido
                return this.post<T>(
                    url, 
                    data, 
                    config, 
                    retryCount - 1, 
                    retryDelay * 2,
                    newTimeout
                );
            }
            
            console.error(`Error en petición POST a ${url}:`, axiosError);
            
            if (axiosError.response?.data?.errors) {
                throw { errors: axiosError.response.data.errors };
            }
            
            if (axiosError.response?.data?.message) {
                throw new Error(axiosError.response.data.message);
            }
            
            throw new Error(`Error al realizar petición a ${url}: ${axiosError.message}`);
        }
    }

    // Métodos específicos de la API
    
    // Obtener cantidad de cupos disponibles
    async fetchCupos(): Promise<number> {
        return this.get<number>('/users/count', undefined, false); // Sin caché, siempre dato fresco
    }

    // Obtener datos iniciales con manejo mejorado de errores
    async fetchInitialData(): Promise<InitialData> {
        try {
            // Versión mejorada que hace las peticiones secuencialmente para evitar sobrecargar el servidor
            const regionales = await this.get<{ id: string; nombre: string }[]>('/regionales/get');
            const departamentos = await this.get<{ id: string; nombre: string }[]>('/departamentos/get');
            const acomodaciones = await this.get<{ id: string; nombre: string }[]>('/acomodacion/get');
            
            // Aumentamos el timeout para esta petición específica que está fallando
            const extensiones = await this.get<{ id: string; nombre: string }[]>(
                '/extensions/get', 
                undefined, 
                true, 
                2,  // 2 reintentos
                2000, // 2 segundos entre reintentos
                60000 // 60 segundos de timeout
            );
            
            const formasPago = await this.get<{ id: string; nombre: string }[]>('/formas/de/pago/get');
            const tiposDocumento = await this.get<{ id: string; nombre: string }[]>('/tipos/de/documento/get');

            return {
                regionales,
                departamentos,
                acomodaciones,
                extensiones,
                formasPago,
                tiposDocumento
            };
        } catch (error) {
            console.error('Error obteniendo datos iniciales:', error);
            
            // Manejo más detallado de errores
            if (error instanceof Error) {
                throw new Error(`No se pudieron cargar los datos iniciales: ${error.message}`);
            }
            
            throw new Error('No se pudieron cargar los datos iniciales. Por favor, intente nuevamente.');
        }
    }

    // Versión alternativa con carga parcial para evitar que un endpoint fallido bloquee toda la carga
    async fetchInitialDataWithPartialLoading(): Promise<Partial<InitialData>> {
        const result: Partial<InitialData> = {};
        
        // Función auxiliar para cargar cada recurso de forma independiente
        const loadResource = async <K extends keyof InitialData>(
            key: K, 
            endpoint: string, 
            customTimeout?: number
        ): Promise<void> => {
            try {
                result[key] = await this.get<InitialData[K]>(
                    endpoint, 
                    undefined, 
                    true, 
                    2, 
                    2000, 
                    customTimeout
                );
            } catch (error) {
                console.error(`Error cargando ${key} desde ${endpoint}:`, error);
                // No lanzamos el error, simplemente dejamos este recurso como undefined
            }
        };
        
        // Cargamos cada recurso de forma independiente
        await Promise.all([
            loadResource('regionales', '/regionales/get'),
            loadResource('departamentos', '/departamentos/get'),
            loadResource('acomodaciones', '/acomodacion/get'),
            loadResource('extensiones', '/extensions/get', 60000), // Mayor timeout para este endpoint problemático
            loadResource('formasPago', '/formas/de/pago/get'),
            loadResource('tiposDocumento', '/tipos/de/documento/get')
        ]);
        
        // Verificamos si obtuvimos al menos algunos datos
        if (Object.keys(result).length === 0) {
            throw new Error('No se pudo cargar ningún dato inicial. Por favor, verifique su conexión.');
        }
        
        return result;
    }

    // Obtener jefes de zona por regional
    async fetchJefesZona(regionalId: string): Promise<{ id: string; nombre: string }[]> {
        return this.get<{ id: string; nombre: string }[]>(`/jefes/de/zona/${regionalId}/get`);
    }

    // Obtener ciudades por departamento
    async fetchCiudades(departamentoId: string): Promise<{ id: string; nombre: string }[]> {
        return this.get<{ id: string; nombre: string }[]>(`/ciudades/${departamentoId}/get`);
    }

    // Registrar usuario
    async registerUser(userData: UserData): Promise<{ success: boolean; message: string }> {
        console.log('Datos recibidos para registro:', JSON.stringify(userData, null, 2));

        const formData = new FormData();

        // Agregar datos básicos del usuario
        Object.entries(userData).forEach(([key, value]) => {
            if (key === 'acompanante') return; // Solo excluimos acompanante, no tiene_acompanante

            if (key === 'imagen_pasaporte' && value instanceof File) {
                formData.append(key, value);
            } else if (typeof value === 'boolean') {
                formData.append(key, value ? '1' : '0');
            } else if (value !== null && value !== undefined) {
                formData.append(key, String(value));
            }
        });

        // Agregar datos del acompañante si existe
        if (userData.tiene_acompanante && userData.acompanante) {
            Object.entries(userData.acompanante).forEach(([key, value]) => {
                if (key === 'imagen_pasaporte' && value instanceof File) {
                    formData.append(`acompanante[${key}]`, value);
                } else if (value !== null && value !== undefined) {
                    formData.append(`acompanante[${key}]`, String(value));
                }
            });
        }

        // Log para depuración
        console.log("FormData a enviar:");
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1] instanceof File ? pair[1].name : pair[1]}`);
        }

        // Usamos un timeout de 120 segundos para el registro que puede tomar más tiempo
        return this.post<{ success: boolean; message: string }>(
            '/user/register', 
            formData, 
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            },
            2, // 2 reintentos
            3000, // 3 segundos entre reintentos
            120000 // 120 segundos de timeout
        );
    }

    // Invalidar caché cuando sea necesario
    invalidateCache(): void {
        this.cache.clear();
    }

    invalidateCacheKey(key: string): void {
        this.cache.clearKey(key);
    }
}

// Interfaces de datos
interface InitialData {
    regionales: { id: string; nombre: string }[];
    departamentos: { id: string; nombre: string }[];
    acomodaciones: { id: string; nombre: string }[];
    extensiones: { id: string; nombre: string }[];
    formasPago: { id: string; nombre: string }[];
    tiposDocumento: { id: string; nombre: string }[];
}

// Exportar instancia única del servicio
const apiService = new ApiService();

// Exportar las funciones individuales para mantener compatibilidad con el código anterior
export const fetchCupos = (): Promise<number> => apiService.fetchCupos();
export const fetchInitialData = (): Promise<InitialData> => apiService.fetchInitialData();
export const fetchJefesZona = (regionalId: string): Promise<{ id: string; nombre: string }[]> => apiService.fetchJefesZona(regionalId);
export const fetchCiudades = (departamentoId: string): Promise<{ id: string; nombre: string }[]> => apiService.fetchCiudades(departamentoId);
export const registerUser = (userData: UserData): Promise<{ success: boolean; message: string }> => apiService.registerUser(userData);

// Exportar método alternativo para carga parcial
export const fetchInitialDataWithPartialLoading = (): Promise<Partial<InitialData>> => apiService.fetchInitialDataWithPartialLoading();

// Exportar el servicio completo como default
export default apiService;