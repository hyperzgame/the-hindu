import PrivacyGate from './components/PrivacyGate.jsx'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Section from './pages/Section.jsx'
import Article from './pages/Article.jsx'
import Search from './pages/Search.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import Sitemap from './pages/Sitemap.jsx'
import Lander from './pages/Lander.jsx'

export default function App(){
  return (
    <div>
      <Header />
      <PrivacyGate />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/section/:sectionSlug" element={<Section/>} />
          <Route path="/article/:id" element={<Article/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/privacy" element={<Privacy/>} />
          <Route path="/terms" element={<Terms/>} />
          <Route path="/sitemap" element={<Sitemap/>} />
          <Route path="/lander" element={<Lander/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}