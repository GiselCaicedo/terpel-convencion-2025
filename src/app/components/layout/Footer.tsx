import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-white py-10 px-6 border-t border-gray-200">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-gray-600 text-sm">
          Todos los derechos reservados © {currentYear} Terpel
        </p>
      </div>
    </footer>
  );
}