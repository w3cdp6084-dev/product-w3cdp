import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FloatingDockDemo from '@/components/ui/floating-dock-demo'
import Top from '@/pages/Top'
import About from '@/pages/About'
import Works from '@/pages/Works'
import Contact from '@/pages/Contact'
import { ThemeProvider } from '@/contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="relative min-h-screen">
          <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/about" element={<About />} />
            <Route path="/works" element={<Works />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-8 z-50">
            <FloatingDockDemo />
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App