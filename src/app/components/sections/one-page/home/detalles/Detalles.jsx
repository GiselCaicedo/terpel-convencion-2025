import { fetchCupos } from '@/app/service/conexion'
import React, { useState, useEffect } from 'react'

const StatCard = ({ icon, number, text }) => (
  <div className="flex flex-col items-center justify-center text-center">
    <img
      src={`/recursos/${icon}`}
      alt={text}
      className="h-10 w-auto mb-4"
    />
    <span className="text-4xl font-bold mb-2 text-black dark:text-white" style={{ color: 'black' }}>{number}</span>
    <span className="text-sm font-medium uppercase text-black dark:text-white" style={{ color: 'black' }}>{text}</span>
  </div>
)

const Detalles = () => {
  const [cuposDisponibles, setCuposDisponibles] = useState(700)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargarCupos = async () => {
      try {
        setLoading(true)
        const data = await fetchCupos()
        // Cálculo de cupos disponibles: 700 - (total_users + users_with_companions)
        const cuposOcupados = data.total_users + data.users_with_companions
        const disponibles = 700 - cuposOcupados
        setCuposDisponibles(disponibles >= 0 ? disponibles : 0)
      } catch (error) {
        console.error('Error al cargar los cupos:', error)
      } finally {
        setLoading(false)
      }
    }

    cargarCupos()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="bg-terpel-red rounded-lg p-8 text-white text-center">
          <img
            src="/recursos/users_icon.svg"
            alt="Users"
            className="h-10 w-auto mx-auto mb-4"
          />
          <div className="text-5xl font-bold mb-2">
            {loading ? '...' : cuposDisponibles}
          </div>
          <div className="text-sm uppercase">Cupos disponibles: 700</div>
        </div>

        <StatCard 
          icon="calendar_icon.svg"
          number="08"
          text="Días de convención"
        />

        <StatCard 
          icon="location_icon.svg"
          number="03"
          text="Ciudades por visitar"
        />

        <StatCard 
          icon="experiences_icon.svg"
          number="11"
          text="Cant. experiencias"
        />
      </div>
    </div>
  )
}

export default Detalles;