// Componente de pantalla de carga
// Este componente se puede importar en el archivo principal
// import LoadingScreen from '@/app/components/sections/formulario/LoadingScreen';

const LoadingScreen = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-medium text-gray-700">Cargando...</h2>
      </div>
    );
  };
  
  export default LoadingScreen;