import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Benefits from './components/Benefits'
import Estimator from './components/Estimator'
import Contact from './components/Contact'
import Dashboard from './components/Dashboard'

function Footer() {
  return (
    <footer className="py-10 border-t border-black/5 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 shadow-inner" />
          <span className="text-lg font-black tracking-tight">PAYLOT</span>
        </a>
        <p className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} PAYLOT. All rights reserved.</p>
      </div>
    </footer>
  )
}

function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100">
      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        <Estimator />
        <Contact />
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<div className="pt-24 min-h-[60vh] flex items-center justify-center text-gray-600 dark:text-gray-300">Page not found. <Link to="/" className="ml-2 underline">Go home</Link></div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
