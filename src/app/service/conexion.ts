import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';
const TIMEOUT = 10000; // 10 segundos por defecto
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos en milisegundos

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
            timeout: TIMEOUT
        });

        this.cache = new ApiCache();

        // Interceptor para loguear peticiones
        this.client.interceptors.request.use(config => {
            console.log(`Realizando petición a: ${config.url}`);
            return config;
        });

        // Interceptor para loguear respuestas
        this.client.interceptors.response.use(
            response => {
                console.log(`Respuesta de ${response.config.url}: Status ${response.status}`);
                return response;
            },
            error => {
                console.error(`Error en petición a ${error.config?.url}:`, error.message);
                return Promise.reject(error);
            }
        );
    }

    // Método genérico para peticiones GET con caché
    async get<T>(url: string, config?: AxiosRequestConfig, useCache: boolean = true): Promise<T> {
        const cacheKey = url;
        
        if (useCache) {
            const cachedData = this.cache.get<T>(cacheKey);
            if (cachedData) {
                console.log(`Usando datos en caché para: ${url}`);
                return cachedData;
            }
        }

        try {
            const response = await this.client.get<T>(url, config);
            
            if (useCache) {
                this.cache.set(cacheKey, response.data);
            }
            
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ApiErrorResponse>;
            console.error(`Error en petición GET a ${url}:`, axiosError);
            
            if (axiosError.response?.data) {
                throw axiosError.response.data;
            }
            
            throw new Error(`Error al realizar petición a ${url}: ${axiosError.message}`);
        }
    }

    // Método genérico para peticiones POST
    async post<T>(url: string, data: FormData | Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.post<T>(url, data, config);
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ApiErrorResponse>;
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

    // Obtener datos iniciales
    async fetchInitialData(): Promise<InitialData> {
        try {
            // Hacemos las peticiones en paralelo pero con mejor manejo y caché
            const [
                regionales,
                departamentos,
                acomodaciones,
                extensiones,
                formasPago,
                tiposDocumento
            ] = await Promise.all([
                this.get<{ id: string; nombre: string }[]>('/regionales/get'),
                this.get<{ id: string; nombre: string }[]>('/departamentos/get'),
                this.get<{ id: string; nombre: string }[]>('/acomodacion/get'),
                this.get<{ id: string; nombre: string }[]>('/extensions/get'),
                this.get<{ id: string; nombre: string }[]>('/formas/de/pago/get'),
                this.get<{ id: string; nombre: string }[]>('/tipos/de/documento/get')
            ]);

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
            throw new Error('No se pudieron cargar los datos iniciales. Por favor, intente nuevamente.');
        }
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

        return this.post<{ success: boolean; message: string }>('/user/register', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            timeout: TIMEOUT * 2 // Doble timeout para registro que puede tomar más tiempo
        });
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

// Exportar el servicio completo como default
export default apiService;