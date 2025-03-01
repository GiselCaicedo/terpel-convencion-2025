'use client'
import { usePathname } from 'next/navigation';
import React from 'react';

export default function ClientWrapper({
  children,
  navbar,
  footer,
}: {
  children: React.ReactNode,
  navbar: React.ReactNode,
  footer: React.ReactNode,
}) {
  const pathname = usePathname();
  const isFormularioPage = pathname === '/formulario';

  return (
    <>
      {navbar}
      <div className={isFormularioPage ? "pt-[64px] md:pt-[80px] lg:pt-[96px]" : ""}>
        {children}
      </div>
      {footer}
    </>
  );
}