// File: src/app/service/currency.ts

interface FixerResponse {
  success: boolean;
  rates: { [key: string]: number };
  error?: {
    code: number;
    type: string;
    info: string;
  };
}

type CurrencyCode = 'EUR' | 'COP' | 'MAD';

interface ExchangeRates {
  EUR: { [key in CurrencyCode]: number };
  COP: { [key in CurrencyCode]: number };
  MAD: { [key in CurrencyCode]: number };
}

let cachedRates: ExchangeRates | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

const fetchAllRates = async (): Promise<ExchangeRates> => {
  const now = Date.now();
  // Usar cache solo si está disponible y no ha expirado
  if (cachedRates && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedRates;
  }

  // Obtener tasas actualizadas de la API
  const response = await fetch('/service/rates', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    signal: AbortSignal.timeout(10000) // 10 second timeout
  });

  if (!response.ok) {
    throw new Error(`API request failed with status: ${response.status}`);
  }

  const data: FixerResponse = await response.json();

  if (!data.success || !data.rates) {
    throw new Error(data.error?.info || 'Failed to fetch rates');
  }

  // Calcular todas las tasas de conversión
  const rates: ExchangeRates = {
    EUR: {
      EUR: 1,
      COP: data.rates.COP,
      MAD: data.rates.MAD
    },
    COP: {
      EUR: 1 / data.rates.COP,
      COP: 1,
      MAD: data.rates.MAD / data.rates.COP
    },
    MAD: {
      EUR: 1 / data.rates.MAD,
      COP: data.rates.COP / data.rates.MAD,
      MAD: 1
    }
  };

  // Actualizar cache
  cachedRates = rates;
  lastFetchTime = now;
  return rates;
};

export const convertCurrency = async (
  from: string, 
  to: string, 
  amount: number
): Promise<string> => {
  try {
    const fromCurrency = from.toUpperCase() as CurrencyCode;
    const toCurrency = to.toUpperCase() as CurrencyCode;
    
    if (!isValidCurrencyCode(fromCurrency) || !isValidCurrencyCode(toCurrency)) {
      throw new Error(`Invalid currency pair: ${from}/${to}`);
    }

    // Obtener las tasas de cambio actualizadas
    const rates = await fetchAllRates();
    const rate = rates[fromCurrency][toCurrency];
    const convertedAmount = amount * rate;
    
    return convertedAmount.toFixed(2);
  } catch (error) {
    console.error('Error converting currency:', error instanceof Error ? error.message : String(error));
    throw new Error(`Currency conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const isValidCurrencyCode = (code: string): boolean => {
  const validCodes: CurrencyCode[] = ['EUR', 'COP', 'MAD'];
  return validCodes.includes(code.toUpperCase() as CurrencyCode);
};