import React from 'react'
import { motion } from 'framer-motion';

export default function DetallesInicio() {
    return (
        <div className="w-full relative bg-transparent py-16">
            <div className="absolute inset-0">
                <motion.img
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.5 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    src="/recursos/back_blue.png"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
                <motion.img
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    src="/recursos/Kv_transp.png"
                    alt="Energia Sin Limites"
                    className="hidden md:block w-60 h-auto mb-6"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center max-w-4xl"
                >
                    <p className="text-lg mb-4">
                        Iremos por más territorios en nuestra convención de Aliados 2025: este año visitaremos 2 grandiosas ciudades:
                        <span className="text-red-600 font-medium"> Madrid </span>
                        y
                        <span className="text-red-600 font-medium"> Marrakech</span>,
                        donde descubriremos juntos otras culturas, nuevos sabores y espacios llenos de historia,
                        con el fin de inspirarnos y seguir liderando el mercado para crear la Terpel que soñamos.
                    </p>
                </motion.div>
            </div>
        </div>
    )
}