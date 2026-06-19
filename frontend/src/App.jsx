import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Playground from './pages/Playground'
import Events from './pages/Events'
import Team from './pages/Team'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/events" element={<Events />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
