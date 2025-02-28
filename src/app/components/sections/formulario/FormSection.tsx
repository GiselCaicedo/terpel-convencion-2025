import React, { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

export default function FormSection({ title, children }: FormSectionProps) {
    return (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
            <h2 className="text-lg font-semibold text-red-600 mb-4">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {children}
            </div>
        </div>
    );
}