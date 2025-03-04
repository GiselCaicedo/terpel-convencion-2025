'use client'

import React, { useState } from 'react';
import { ArrowLeftRight, ArrowUpDown } from 'lucide-react';
import { convertCurrency } from '@/app/service/currency';
import Image from 'next/image';

interface CurrencyState {
  from1: { type: string; amount: string; result: string; targetType: string };
  from2: { type: string; amount: string; result: string; targetType: string };
}

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState<CurrencyState>({
    from1: { type: 'EUR', amount: '50', result: '3792', targetType: 'COP' },
    from2: { type: 'MAD', amount: '50', result: '3792', targetType: 'COP' }
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCurrencyChange = async (converter: '1' | '2', value: string) => {
    const fromKey = `from${converter}` as 'from1' | 'from2';
    const currentFrom = currencies[fromKey];

    setErrorMessage(null);

    setCurrencies(prev => ({
      ...prev,
      [fromKey]: {
        ...prev[fromKey],
        amount: value,
      }
    }));

    try {
      if (!value || isNaN(Number(value))) {
        throw new Error('Por favor ingrese un número válido');
      }

      const result = await convertCurrency(
        currentFrom.type,
        currentFrom.targetType,
        Number(value)
      );

      setCurrencies(prev => ({
        ...prev,
        [fromKey]: {
          ...prev[fromKey],
          result
        }
      }));
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Error en la conversión');

      setCurrencies(prev => ({
        ...prev,
        [fromKey]: {
          ...prev[fromKey],
          result: '0'
        }
      }));
    }
  };

  const swapCurrencyValues = (converter: '1' | '2') => {
    const fromKey = `from${converter}` as 'from1' | 'from2';
    setErrorMessage(null);

    setCurrencies(prev => ({
      ...prev,
      [fromKey]: {
        ...prev[fromKey],
        amount: prev[fromKey].result,
        result: prev[fromKey].amount
      }
    }));

    // Trigger conversion with new amount
    handleCurrencyChange(converter, currencies[fromKey].result);
  };

  const swapCurrencyTypes = async (converter: '1' | '2') => {
    const fromKey = `from${converter}` as 'from1' | 'from2';
    const current = currencies[fromKey];

    // Solo permitir intercambio entre EUR-COP y MAD-COP
    let newType: string;
    let newTargetType: string;

    if (current.type === 'COP') {
      // Si es COP, cambiamos al tipo anterior (EUR o MAD)
      newType = converter === '1' ? 'EUR' : 'MAD';
      newTargetType = 'COP';
    } else {
      // Si es EUR o MAD, cambiamos a COP
      newType = 'COP';
      newTargetType = current.type;
    }

    setCurrencies(prev => ({
      ...prev,
      [fromKey]: {
        ...prev[fromKey],
        type: newType,
        targetType: newTargetType,
        amount: prev[fromKey].result,
        result: prev[fromKey].amount
      }
    }));

    // Trigger conversion with new currencies
    try {
      const result = await convertCurrency(
        newType,
        newTargetType,
        Number(current.result)
      );

      setCurrencies(prev => ({
        ...prev,
        [fromKey]: {
          ...prev[fromKey],
          result
        }
      }));
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Error en la conversión');
    }
  };

  const getCurrencyFlag = (currency: string): string => {
    switch (currency) {
      case 'EUR':
        return 'euro';
      case 'COP':
        return 'cop';
      case 'MAD':
        return 'moneda_dirham';
      default:
        return 'cop';
    }
  };

  const formatCurrency = (value: string, currency: string) => {
    const number = parseFloat(value);
    if (isNaN(number)) return '';

    try {
      switch (currency) {
        case 'EUR':
          return '€ ' + number.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        case 'COP':
          return '$ ' + number.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        case 'MAD':
          return number.toLocaleString('ar-MA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' MAD';
        default:
          return number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }
    } catch (error) {
      console.log(error)
      return value;
    }
  };

  return (
    <div className="bg-white0 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-terpel-red mb-4 tracking-tight">
            CONVERTIDOR DE MONEDA
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Realiza conversiones entre EUR, COP y MAD de manera rápida y sencilla
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-8 mx-auto max-w-3xl">
            <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-terpel-red" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-terpel-red">{errorMessage}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Converters Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* First Converter */}
          <div className="bg-white rounded-2xl  p-6 border ">
            <div className="flex gap-4 items-center">
              {/* Left Currency */}
              <div className="flex-1">
                <div className="bg-terpel-red text-white p-4 rounded-xl flex items-center justify-between mb-2 shadow-sm">
                  <span className="font-semibold text-lg">{currencies.from1.type}</span>
                  <Image
                    src={`/recursos/${getCurrencyFlag(currencies.from1.type)}.png`}
                    alt={`Bandera ${currencies.from1.type}`}
                    className="w-8 h-8 rounded-lg shadow-sm"
                    width={32}
                    height={32}
                  />
                </div>
                <input
                  type="number"
                  value={currencies.from1.amount}
                  onChange={(e) => handleCurrencyChange('1', e.target.value)}
                  className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder={`Cantidad en ${currencies.from1.type}`}
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Swap Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => swapCurrencyTypes('1')}
                  className="p-3 text-terpel-red hover:text-terpel-red rounded-full transition-colors duration-200"
                  aria-label="Cambiar tipo de moneda"
                >
                  <ArrowUpDown className="w-6 h-6" />
                </button>
                <button
                  onClick={() => swapCurrencyValues('1')}
                  className="p-3 text-terpel-red hover:text-terpel-red rounded-full transition-colors duration-200"
                  aria-label="Intercambiar valores"
                >
                  <ArrowLeftRight className="w-6 h-6" />
                </button>
              </div>

              {/* Right Currency */}
              <div className="flex-1">
                <div className="bg-terpel-red text-white p-4 rounded-xl flex items-center justify-between mb-2 shadow-sm">
                  <span className="font-semibold text-lg">{currencies.from1.targetType}</span>
                  <Image
                    src={`/recursos/${getCurrencyFlag(currencies.from1.targetType)}.png`}
                    alt={`Bandera ${currencies.from1.targetType}`}
                    className="w-8 h-8 rounded-lg shadow-sm"
                    width={32}
                    height={32}
                  />
                </div>
                <input
                  type="text"
                  value={formatCurrency(currencies.from1.result, currencies.from1.targetType)}
                  readOnly
                  className="w-full border border-gray-200 p-4 rounded-xl bg-gray-50 text-gray-700"
                  placeholder={`Cantidad en ${currencies.from1.targetType}`}
                />
              </div>
            </div>
          </div>

          {/* Second Converter */}
          <div className="bg-white rounded-2xl  p-6 border">
            <div className="flex gap-4 items-center">
              {/* Left Currency */}
              <div className="flex-1">
                <div className="bg-terpel-red text-white p-4 rounded-xl flex items-center justify-between mb-2 shadow-sm">
                  <span className="font-semibold text-lg">{currencies.from2.type}</span>
                  <Image
                    src={`/recursos/${getCurrencyFlag(currencies.from2.type)}.png`}
                    alt={`Bandera ${currencies.from2.type}`}
                    className="w-8 h-8 rounded-lg shadow-sm"
                    width={32}
                    height={32}
                  />
                </div>
                <input
                  type="number"
                  value={currencies.from2.amount}
                  onChange={(e) => handleCurrencyChange('2', e.target.value)}
                  className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder={`Cantidad en ${currencies.from2.type}`}
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Swap Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => swapCurrencyTypes('2')}
                  className="p-3 text-terpel-red hover:text-terpel-red rounded-full transition-colors duration-200"
                  aria-label="Cambiar tipo de moneda"
                >
                  <ArrowUpDown className="w-6 h-6" />
                </button>
                <button
                  onClick={() => swapCurrencyValues('2')}
                  className="p-3 text-terpel-red hover:text-terpel-red rounded-full transition-colors duration-200"
                  aria-label="Intercambiar valores"
                >
                  <ArrowLeftRight className="w-6 h-6" />
                </button>
              </div>

              {/* Right Currency */}
              <div className="flex-1">
                <div className="bg-terpel-red text-white p-4 rounded-xl flex items-center justify-between mb-2 shadow-sm">
                  <span className="font-semibold text-lg">{currencies.from2.targetType}</span>
                  <Image
                    src={`/recursos/${getCurrencyFlag(currencies.from2.targetType)}.png`}
                    alt={`Bandera ${currencies.from2.targetType}`}
                    className="w-8 h-8 rounded-lg shadow-sm"
                    width={32}
                    height={32}
                  />
                </div>
                <input
                  type="text"
                  value={formatCurrency(currencies.from2.result, currencies.from2.targetType)}
                  readOnly
                  className="w-full border border-gray-200 p-4 rounded-xl bg-gray-50 text-gray-700"
                  placeholder={`Cantidad en ${currencies.from2.targetType}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;