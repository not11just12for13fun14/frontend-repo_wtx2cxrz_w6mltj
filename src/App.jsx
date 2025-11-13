import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Benefits from './components/Benefits'
import Estimator from './components/Estimator'
import Contact from './components/Contact'

function Footer() {
  return (
    <footer className="py-10 border-t border-black/5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 shadow-inner" />
          <span className="text-lg font-black tracking-tight">PAYLOT</span>
        </a>
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} PAYLOT. All rights reserved.</p>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        <Estimator />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
