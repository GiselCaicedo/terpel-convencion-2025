import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Formulario() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/formulario');
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: '400px' }}>
      <div className="absolute inset-0">
        <Image
          src="/recursos/banner_footer.png"
          alt="FooterImagen"
          className="object-cover"
          fill={true}
          priority 
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:hidden"></div>

      <div className="absolute top-0 left-0 w-full md:w-1/2 lg:w-2/5 h-full flex flex-col justify-center px-4 sm:px-6 md:px-8 py-8 z-10">
        <h2 className="text-1xl sm:text-1xl md:text-5xl lg:text-4xl font-medium text-yellow-400 mb-4 md:mb-6 leading-tight tracking-wide">
          ¿Quieres hacer parte de esta experiencia?
        </h2>

        <button 
          onClick={handleRedirect}
          className="group relative px-4 py-2 md:px-6 md:py-3 text-white border-2 border-white rounded-full hover:bg-white hover:text-red-600 transition-all duration-300 flex items-center justify-center overflow-hidden w-40"
        >
          <span className="relative z-10 flex items-center gap-2">
            Registrarme
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </span>
          <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
        </button>
      </div>
    </div>
  );
}