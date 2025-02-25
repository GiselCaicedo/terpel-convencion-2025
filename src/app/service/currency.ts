const API_KEY = 'bdd22dc1615ae62b2244161de71e411b';
const BASE_URL = 'http://data.fixer.io/api';

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
  if (cachedRates && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedRates;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/latest?access_key=${API_KEY}&symbols=EUR,COP,MAD`
    );

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data: FixerResponse = await response.json();

    if (!data.success || !data.rates) {
      throw new Error(data.error?.info || 'Failed to fetch rates');
    }

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

    cachedRates = rates;
    lastFetchTime = now;
    return rates;
  } catch (error) {
    console.error('Error fetching rates:', error);
    throw error;
  }
};

export const convertCurrency = async (
  from: string, 
  to: string, 
  amount: number
): Promise<string> => {
  try {
    const rates = await fetchAllRates();
    
    const fromCurrency = from.toUpperCase() as CurrencyCode;
    const toCurrency = to.toUpperCase() as CurrencyCode;
    
    if (!isValidCurrencyCode(fromCurrency) || !isValidCurrencyCode(toCurrency)) {
      throw new Error(`Invalid currency pair: ${from}/${to}`);
    }

    const rate = rates[fromCurrency][toCurrency];
    const convertedAmount = amount * rate;
    
    return convertedAmount.toFixed(2);
  } catch (error) {
    console.error('Error converting currency:', error);
    return '0.00';
  }
};

export const isValidCurrencyCode = (code: string): boolean => {
  const validCodes: CurrencyCode[] = ['EUR', 'COP', 'MAD'];
  return validCodes.includes(code.toUpperCase() as CurrencyCode);
};