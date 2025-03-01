import React from 'react';

const PricingPlans = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 bg-white mt-6 sm:mt-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-red-500 mb-8 sm:mb-12">PLANES</h1>
      
      {/* Versión móvil - Cards individuales */}
      <div className="lg:hidden space-y-6">
        {/* Opciones de pago - header independiente */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md mb-4">
          <div className="bg-red-500 text-white py-4 px-6 font-bold text-xl text-center">
            OPCIONES DE PAGO
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            <div className="p-4 sm:p-5 bg-white">
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 mb-1">Pago mensual a cuotas</span>
                <p className="text-gray-600 text-sm">hasta 1 Septiembre 2025. (Cuenta designada por terpel)</p>
              </div>
            </div>
            <div className="p-4 sm:p-5 bg-white">
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 mb-1">Pago con cruce de incentivos</span>
                <p className="text-gray-600 text-sm">a Septiembre 2025.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card Acomodación Sencilla */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md transition-transform hover:shadow-lg hover:scale-102">
          <div className="bg-red-500 text-white py-4 px-6 font-bold text-xl text-center">
            ACOMODACIÓN SENCILLA
          </div>
          <div className="p-0">
            <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-100">
              <span className="font-semibold text-gray-700">VALOR CONVENCIÓN:</span>
              <span className="text-lg sm:text-xl">25.782.800</span>
            </div>
            <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-gray-700">DESCUENTO 5%:</span>
                </div>
                <span className="text-lg sm:text-xl">24.493.660</span>
              </div>
            </div>
            <div className="p-4 sm:p-5 border-b border-gray-100">
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 mb-1">Pago Total convención:</span>
                <p className="text-red-500 text-sm font-medium">31 Marzo 2025</p>
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
              <span className="text-lg sm:text-xl">22.764.200</span>
            </div>
            <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-gray-700">DESCUENTO 5%:</span>
                </div>
                <span className="text-lg sm:text-xl">21.625.990</span>
              </div>
            </div>
            <div className="p-4 sm:p-5 border-b border-gray-100">
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 mb-1">Pago Total convención:</span>
                <p className="text-red-500 text-sm font-medium">31 Marzo 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Versión tablet - Diseño intermedio */}
      <div className="hidden md:block lg:hidden bg-white">
        {/* Opciones de pago - header independiente */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md mb-6">
          <div className="bg-red-500 text-white py-4 px-6 font-bold text-xl text-center">
            OPCIONES DE PAGO
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            <div className="p-4 sm:p-5 bg-white">
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 mb-1">Pago mensual a cuotas</span>
                <p className="text-gray-600 text-sm">hasta 1 Septiembre 2025. (Cuenta designada por terpel)</p>
              </div>
            </div>
            <div className="p-4 sm:p-5 bg-white">
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 mb-1">Pago con cruce de incentivos</span>
                <p className="text-gray-600 text-sm">a Septiembre 2025.</p>
              </div>
            </div>
          </div>
        </div>

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
                  <span className="font-semibold text-gray-700">DESCUENTO 5%:</span>
                </div>
                <span className="font-bold text-xl">24.493.660</span>
              </div>
              <div className="p-5">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-700 mb-1">Pago Total convención:</span>
                  <p className="text-red-500 text-sm font-medium">31 Marzo 2025</p>
                </div>
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
                  <span className="font-semibold text-gray-700">DESCUENTO 5%:</span>
                </div>
                <span className="font-bold text-xl">21.625.990</span>
              </div>
              <div className="p-5">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-700 mb-1">Pago Total convención:</span>
                  <p className="text-red-500 text-sm font-medium">31 Marzo 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Versión desktop - Tabla */}
      <div className="hidden lg:block bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-left border border-gray-200 font-semibold">ACOMODACIÓN</th>
              <th className="p-4 text-left border border-gray-200 font-semibold">VALOR CONVENCIÓN</th>
              <th className="p-4 text-left border border-gray-200 font-semibold">DESCUENTO 5%</th>
              <th className="p-4 text-center border border-gray-200 font-semibold" colSpan={2}>
                Pago Total convención:
                <div className="text-red-500 text-sm font-medium">31 Marzo 2025</div>
              </th>
            </tr>
            <tr>
              <th className="p-4 text-left border border-gray-200 font-semibold" colSpan={3}></th>
              <th className="p-4 text-center border border-gray-200 font-semibold">
                <div className="mb-1 font-medium">Pago mensual a cuotas</div>
                <div className="text-sm text-gray-600">hasta 1 Septiembre 2025. (Cuenta designada por terpel)</div>
              </th>
              <th className="p-4 text-center border border-gray-200 font-semibold">
                <div className="mb-1 font-medium">Pago con cruce de incentivos</div>
                <div className="text-sm text-gray-600">a Septiembre 2025.</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border border-gray-200">Sencilla</td>
              <td className="p-4 border border-gray-200">25.782.800</td>
              <td className="p-4 border border-gray-200">24.493.660</td>
              <td className="p-4 border border-gray-200 text-center">✓</td>
              <td className="p-4 border border-gray-200 text-center">✓</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200">Doble</td>
              <td className="p-4 border border-gray-200">22.764.200</td>
              <td className="p-4 border border-gray-200">21.625.990</td>
              <td className="p-4 border border-gray-200 text-center">✓</td>
              <td className="p-4 border border-gray-200 text-center">✓</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Sección de pago a cuotas */}
      <div className="mt-10 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 sm:p-6">
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
    </div>
  );
};

export default PricingPlans;