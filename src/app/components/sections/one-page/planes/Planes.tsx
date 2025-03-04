import React from 'react';

const PricingPlans = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 bg-white mt-6 sm:mt-10">
      <h1 className="text-5xl font-terpel font-bold text-center text-terpel-red mb-8 sm:mb-12">PLANES</h1>

      {/* Versión móvil - Cards individuales */}
      <div className="lg:hidden space-y-6">
        {/* Opciones de pago - header independiente */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md mb-4">
          <div className="bg-terpel-red text-white py-4 px-6 font-terpel font-normal text-xl text-center">
            OPCIONES DE PAGO
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            <div className="p-4 sm:p-5 bg-white">
              <div className="flex flex-col items-center">
                <span className="font-semibold text-gray-700 mb-1 text-center">Pago mensual a cuotas</span>
                <p className="text-gray-600 text-xs text-center">hasta 1 Septiembre 2025.</p>
                <p className="text-gray-600 text-xs text-center">(Cuenta designada por terpel)</p>
              </div>
            </div>
            <div className="p-4 sm:p-5 bg-white">
              <div className="flex flex-col items-center">
                <span className="font-semibold text-gray-700 mb-1 text-center">Pago con cruce de incentivos</span>
                <p className="text-gray-600 text-xs text-center">a Septiembre 2025.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card Acomodación Sencilla */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md transition-transform hover:shadow-lg hover:scale-102">
          <div className="bg-terpel-red text-white py-4 px-6 font-terpel font-normal text-xl text-center">
            ACOMODACIÓN SENCILLA
          </div>
          <div className="p-0">
            <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-100">
              <span className="font-semibold text-gray-700">VALOR CONVENCIÓN:</span>
              <span className="text-lg sm:text-xl">$28.724.000</span>
            </div>
            <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-gray-700">Pago Total convención:</span>
                  <p className="text-terpel-red text-xs font-medium">31 Marzo 2025</p>
                  <span className="font-semibold text-gray-700">5% de descuento:</span>
                </div>
                <span className="text-lg sm:text-xl">$28.287.800</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Acomodación Doble */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md transition-transform hover:shadow-lg hover:scale-102">
          <div className="bg-terpel-red text-white py-4 px-6 font-terpel font-normal text-xl text-center">
            ACOMODACIÓN DOBLE
          </div>
          <div className="p-0">
            <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-100">
              <span className="font-semibold text-gray-700">VALOR CONVENCIÓN:</span>
              <span className="text-lg sm:text-xl">$25.554.900</span>
            </div>
            <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-gray-700">Pago Total convención:</span>
                  <p className="text-terpel-red text-xs font-medium">31 Marzo 2025</p>
                  <span className="font-semibold text-gray-700">5% de descuento:</span>
                </div>
                <span className="text-lg sm:text-xl">$24.277.155</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Versión tablet - Diseño intermedio */}
      <div className="hidden md:block lg:hidden bg-white">
        {/* Opciones de pago - header independiente */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md mb-6">
          <div className="bg-terpel-red text-white py-4 px-6 font-terpel font-normal text-xl text-center">
            OPCIONES DE PAGO
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            <div className="p-4 sm:p-5 bg-white">
              <div className="flex flex-col items-center">
                <span className="font-semibold text-gray-700 mb-1 text-center">Pago mensual a cuotas</span>
                <p className="text-gray-600 text-xs text-center">hasta 1 Septiembre 2025.</p>
                <p className="text-gray-600 text-xs text-center">(Cuenta designada por terpel)</p>
              </div>
            </div>
            <div className="p-4 sm:p-5 bg-white">
              <div className="flex flex-col items-center">
                <span className="font-semibold text-gray-700 mb-1 text-center">Pago con cruce de incentivos</span>
                <p className="text-gray-600 text-xs text-center">a Septiembre 2025.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Columna Sencilla */}
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md">
            <div className="bg-terpel-red text-white py-4 px-6 font-terpel font-normal text-xl text-center">
              ACOMODACIÓN SENCILLA
            </div>
            <div className="grid grid-cols-1 divide-y divide-gray-100">
              <div className="flex justify-between items-center p-5">
                <span className="font-semibold text-gray-700">VALOR CONVENCIÓN:</span>
                <span className="font-terpel font-normal text-xl">$28.724.000</span>
              </div>
              <div className="flex justify-between items-center p-5 bg-gray-50">
                <div>
                  <span className="font-semibold text-gray-700">Pago Total convención:</span>
                  <p className="text-terpel-red text-xs font-medium">31 Marzo 2025</p>
                  <span className="font-semibold text-gray-700">5% de descuento:</span>
                </div>
                <span className="font-terpel font-normal text-xl">$28.287.800</span>
              </div>
            </div>
          </div>

          {/* Columna Doble */}
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md">
            <div className="bg-terpel-red text-white py-4 px-6 font-terpel font-normal text-xl text-center">
              ACOMODACIÓN DOBLE
            </div>
            <div className="grid grid-cols-1 divide-y divide-gray-100">
              <div className="flex justify-between items-center p-5">
                <span className="font-semibold text-gray-700">VALOR CONVENCIÓN:</span>
                <span className="font-terpel font-normal text-xl">$25.554.900</span>
              </div>
              <div className="flex justify-between items-center p-5 bg-gray-50">
                <div>
                  <span className="font-semibold text-gray-700">Pago Total convención:</span>
                  <p className="text-terpel-red text-xs font-medium">31 Marzo 2025</p>
                  <span className="font-semibold text-gray-700">5% de descuento:</span>
                </div>
                <span className="font-terpel font-normal text-xl">$24.277.155</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Versión desktop - Tabla que coincide con el diseño de la imagen 2 */}
      <div className="hidden lg:block bg-white">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="p-3 text-left font-semibold bg-white border-0"></th>
              <th className="p-3 text-center font-semibold bg-white border-0"></th>
              <th className="p-3 text-center font-semibold bg-white border-0"></th>
              <th className="p-3 text-center border border-gray-200 font-semibold bg-white" colSpan={2}>
                Opciones de pago
              </th>
            </tr>
            <tr>
              <th className="p-3 text-left border border-gray-200 font-semibold bg-white">ACOMODACIÓN</th>
              <th className="p-3 text-center border border-gray-200 font-semibold bg-white">VALOR<br />CONVENCIÓN</th>
              <th className="p-3 text-center border border-gray-200 font-semibold bg-white">Pago Total convención: 31 Marzo 2025 <br />
                5% de descuento</th>
              <th className="p-3 text-center border border-gray-200 font-semibold bg-white">
                <div className=" text-center">Pago mensual a cuotas</div>
                <span className="text-xs text-gray-600 block text-center">(Cuenta designada por terpel)</span>
                <span className="text-xs text-gray-600 block text-center">hasta 1 Septiembre 2025.</span>
              </th>
              <th className="p-3 text-center border border-gray-200 font-semibold bg-white">
                <div className="text-center">Pago con cruce </div>
                <div className="text-center">de incentivos a</div>
                <div className="text-center">Septiembre 2025.</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border border-gray-200 bg-white">Sencilla</td>
              <td className="p-4 border border-gray-200 bg-white text-center">$28.724.000</td>
              <td className="p-4 border border-gray-200 bg-white text-center">$28.287.800</td>
              <td className="p-4 border border-gray-200 bg-white text-center">✓</td>
              <td className="p-4 border border-gray-200 bg-white text-center">✓</td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-200 bg-white">Doble</td>
              <td className="p-4 border border-gray-200 bg-white text-center">$25.554.900</td>
              <td className="p-4 border border-gray-200 bg-white text-center">$24.277.155</td>
              <td className="p-4 border border-gray-200 bg-white text-center">✓</td>
              <td className="p-4 border border-gray-200 bg-white text-center">✓</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="p-4 border border-gray-200 text-center text-xs text-gray-600 italic bg-white" colSpan={5}>
                Precio por persona
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
  );
};

export default PricingPlans;