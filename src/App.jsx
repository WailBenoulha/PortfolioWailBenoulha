
import './App.css'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Footer from './components/Footer'
import portfolioData from './data/portfolioData.json'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  return (
    <>
      {/* Loading screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-slate-950 flex items-center justify-center z-50">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full border-4 border-blue-500 border-t-purple-500 animate-spin mx-auto"></div>
            <p className="text-white font-semibold">Loading Portfolio...</p>
          </div>
        </div>
      )}

      <Navbar />
      <div id="home">
        <Hero data={portfolioData} />
      </div>
      <div id="skills">
        <Skills data={portfolioData} />
      </div>
      <div id="projects">
        <Projects data={portfolioData} />
      </div>
      <div id="experience">
        <Experience data={portfolioData} />
      </div>
      <div id="education">
        <Education data={portfolioData} />
      </div>
      <Footer />
    </>
  )
}

export default App
