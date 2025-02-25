import React from 'react';

const PricingPlans = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 bg-white mt-6 sm:mt-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-red-500 mb-8 sm:mb-12">PLANES</h1>
      
      {/* Versión móvil - Cards individuales */}
      <div className="lg:hidden space-y-6">
        {/* Card Acomodación Sencilla */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md transition-transform hover:shadow-lg hover:scale-102">
          <div className="bg-red-500 text-white py-4 px-6 font-bold text-xl text-center">
            ACOMODACIÓN SENCILLA
          </div>
          <div className="p-0">
            <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-100">
              <span className="font-semibold text-gray-700">VALOR CONVENCIÓN:</span>
              <span className=" text-lg sm:text-xl">25.782.800</span>
            </div>
            <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-gray-700">PAGO ANTES DE MAYO:</span>
                  <p className="text-red-500 text-sm font-medium mt-1">DESCUENTO (10%)</p>
                </div>
                <span className=" text-lg sm:text-xl">25.782.800</span>
              </div>
            </div>
            <div className="p-4 sm:p-5 bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-gray-700">PAGO ANTES DE JULIO:</span>
                  <p className="text-red-500 text-sm font-medium mt-1">DESCUENTO (5%)</p>
                </div>
                <span className=" text-lg sm:text-xl">27.356.600</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Acomodación Doble */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md transition-transform hover:shadow-lg hover:scale-102">
          <div className="bg-red-500 text-white py-4 px-6 font-bold text-xl text-center">
            ACOMODACIÓN DOBLE
          </div>
          <div className="p-0">
            <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-100">
              <span className="font-semibold text-gray-700">VALOR CONVENCIÓN:</span>
              <span className=" text-lg sm:text-xl">22.764.200</span>
            </div>
            <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-gray-700">PAGO ANTES DE MAYO:</span>
                  <p className="text-red-500 text-sm font-medium mt-1">DESCUENTO (10%)</p>
                </div>
                <span className=" text-lg sm:text-xl">22.764.200</span>
              </div>
            </div>
            <div className="p-4 sm:p-5 bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-gray-700">PAGO ANTES DE JULIO:</span>
                  <p className="text-red-500 text-sm font-medium mt-1">DESCUENTO (5%)</p>
                </div>
                <span className=" text-lg sm:text-xl">24.338.000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Versión tablet - Diseño intermedio */}
      <div className="hidden md:block lg:hidden bg-white">
        <div className="grid grid-cols-2 gap-6">
          {/* Columna Sencilla */}
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md">
            <div className="bg-red-500 text-white py-4 px-6 font-bold text-xl text-center">
              ACOMODACIÓN SENCILLA
            </div>
            <div className="grid grid-cols-1 divide-y divide-gray-100">
              <div className="flex justify-between items-center p-5">
                <span className="font-semibold text-gray-700">VALOR CONVENCIÓN:</span>
                <span className="font-bold text-xl">25.782.800</span>
              </div>
              <div className="flex justify-between items-center p-5 bg-gray-50">
                <div>
                  <span className="font-semibold text-gray-700">PAGO ANTES DE MAYO:</span>
                  <p className="text-red-500 text-sm font-medium mt-1">DESCUENTO (10%)</p>
                </div>
                <span className="font-bold text-xl">25.782.800</span>
              </div>
              <div className="flex justify-between items-center p-5 bg-gray-50">
                <div>
                  <span className="font-semibold text-gray-700">PAGO ANTES DE JULIO:</span>
                  <p className="text-red-500 text-sm font-medium mt-1">DESCUENTO (5%)</p>
                </div>
                <span className="font-bold text-xl">27.356.600</span>
              </div>
            </div>
          </div>
          
          {/* Columna Doble */}
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md">
            <div className="bg-red-500 text-white py-4 px-6 font-bold text-xl text-center">
              ACOMODACIÓN DOBLE
            </div>
            <div className="grid grid-cols-1 divide-y divide-gray-100">
              <div className="flex justify-between items-center p-5">
                <span className="font-semibold text-gray-700">VALOR CONVENCIÓN:</span>
                <span className="font-bold text-xl">22.764.200</span>
              </div>
              <div className="flex justify-between items-center p-5 bg-gray-50">
                <div>
                  <span className="font-semibold text-gray-700">PAGO ANTES DE MAYO:</span>
                  <p className="text-red-500 text-sm font-medium mt-1">DESCUENTO (10%)</p>
                </div>
                <span className="font-bold text-xl">22.764.200</span>
              </div>
              <div className="flex justify-between items-center p-5 bg-gray-50">
                <div>
                  <span className="font-semibold text-gray-700">PAGO ANTES DE JULIO:</span>
                  <p className="text-red-500 text-sm font-medium mt-1">DESCUENTO (5%)</p>
                </div>
                <span className="font-bold text-xl">24.338.000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Versión desktop - Tabla */}
      <div className="hidden lg:block bg-white">
        <div className="grid grid-cols-4 gap-6">
          <div className="space-y-6">
            <div className="h-24 flex flex-col justify-end">
              <h2 className="text-lg font-semibold text-red-500">ACOMODACIÓN</h2>
            </div>
            <div className="space-y-8">
              <div className="p-4 bg-gray-50 rounded-lg text-gray-800 font-medium transition-colors hover:bg-gray-100">
                SENCILLA
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-gray-800 font-medium transition-colors hover:bg-gray-100">
                DOBLE
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-24 flex flex-col justify-end">
              <h2 className="text-lg font-semibold text-gray-700">VALOR CONVENCIÓN</h2>
            </div>
            <div className="space-y-8">
              <div className="p-4 bg-gray-50 rounded-lg text-gray-800 font-medium transition-colors hover:bg-gray-100">
                25.782.800
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-gray-800 font-medium transition-colors hover:bg-gray-100">
                22.764.200
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-24 flex flex-col justify-end">
              <h2 className="text-lg font-semibold text-gray-700">PAGO ANTES DE MAYO</h2>
              <p className="text-red-500 font-medium mt-1">DESCUENTO (10%)</p>
            </div>
            <div className="space-y-8">
              <div className="p-4 bg-gray-50 rounded-lg text-gray-800 font-medium transition-colors hover:bg-gray-100">
                25.782.800
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-gray-800 font-medium transition-colors hover:bg-gray-100">
                22.764.200
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-24 flex flex-col justify-end">
              <h2 className="text-lg font-semibold text-gray-700">PAGO ANTES DE JULIO</h2>
              <p className="text-red-500 font-medium mt-1">DESCUENTO (5%)</p>
            </div>
            <div className="space-y-8">
              <div className="p-4 bg-gray-50 rounded-lg text-gray-800 font-medium transition-colors hover:bg-gray-100">
                27.356.600
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-gray-800 font-medium transition-colors hover:bg-gray-100">
                24.338.000
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de pago a cuotas */}
      <div className="mt-10 sm:mt-14 p-5 sm:p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-5">Pago a cuotas</h3>
        <ol className="space-y-3 sm:space-y-4 text-gray-700">
          <li className="flex gap-3 items-center">
            <span className="flex items-center justify-center min-w-6 h-6 rounded-full bg-red-500 text-white font-medium text-sm">1</span>
            <span className="font-medium">Anticipo de incentivo - max dic 2025.</span>
          </li>
          <li className="flex gap-3 items-center">
            <span className="flex items-center justify-center min-w-6 h-6 rounded-full bg-red-500 text-white font-medium text-sm">2</span>
            <span className="font-medium">Renovación de contrato - max dic 2025.</span>
          </li>
          <li className="flex gap-3 items-center">
            <span className="flex items-center justify-center min-w-6 h-6 rounded-full bg-red-500 text-white font-medium text-sm">3</span>
            <span className="font-medium">Cuotas - 18 cuotas - mes fijo</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default PricingPlans;