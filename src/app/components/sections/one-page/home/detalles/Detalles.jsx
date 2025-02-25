import React from 'react'

const StatCard = ({ icon, number, text }) => (
  <div className="flex flex-col items-center justify-center text-center">
    <img
      src={`/recursos/${icon}`}
      alt={text}
      className="h-10 w-auto mb-4"
    />
    <span className="text-4xl font-bold mb-2">{number}</span>
    <span className="text-sm font-light uppercase">{text}</span>
  </div>
)

const Detalles = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="bg-red-600 rounded-lg p-8 text-white text-center">
          <img
            src="/recursos/users_icon.svg"
            alt="Users"
            className="h-10 w-auto mx-auto mb-4"
          />
          <div className="text-5xl font-bold mb-2">764</div>
          <div className="text-sm uppercase">Cupos disponibles: 800</div>
        </div>

        <StatCard 
          icon="calendar_icon.svg"
          number="08"
          text="Días de convención"
        />

        <StatCard 
          icon="location_icon.svg"
          number="02"
          text="Lugares por conocer"
        />

        <StatCard 
          icon="experiences_icon.svg"
          number="10"
          text="Cant. experiencias"
        />
      </div>
    </div>
  )
}

export default Detalles;