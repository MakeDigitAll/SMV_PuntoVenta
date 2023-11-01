import React from 'react'

const Unauthorized = () => {
  return (
    <div className="flex flex-col h-screen text-center items-center justify-center text-5xl">
      <h1 className="font-bold">No autorizado</h1>
      <p className="text-2xl">No tienes permisos para acceder a esta página</p>
    </div>
  )
}

export default Unauthorized