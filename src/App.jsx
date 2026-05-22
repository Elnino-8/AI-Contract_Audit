import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col">
      {!isLanding && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isLanding && <Footer />}
    </div>
  )
}
