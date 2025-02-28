import React from 'react';

interface PDFViewerProps {
  url: string;
  onClose: () => void;
}

// Componente para mostrar PDF
export default function PDFViewer({ url, onClose }: PDFViewerProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-11/12 h-5/6 max-w-4xl">
                <div className="p-4 flex justify-between items-center border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Política de Privacidad</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        &times;
                    </button>
                </div>
                <div className="h-full p-4">
                    <iframe
                        src={url}
                        className="w-full h-full"
                        title="Política de Privacidad"
                    />
                </div>
            </div>
        </div>
    );
};