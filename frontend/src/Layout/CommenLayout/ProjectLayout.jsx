import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'

const ProjectLayout = () => {
  return (
    <div>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}

export default ProjectLayout