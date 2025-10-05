import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

export default function MainLayout(){
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        <Outlet />
      </div>
    </div>
  )
}
