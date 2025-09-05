import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PrivacyModal from '../components/PrivacyModal'
import data from '../data/articles.json'
import Card from '../components/Card.jsx'

export default function Home(){
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()

  const featured = data.slice(0,6)
  const more = data.slice(6,18)
  return (
    <div>
      <PrivacyModal open={open} onClose={()=>{setOpen(false); navigate('/privacy')}} onAccept={()=>{setOpen(false); navigate('/privacy')}} />
      <div className="hero">
        <div className="grid">
          {featured.slice(0,3).map(a => <Card key={a.id} article={a} />)}
        </div>
        <div className="grid">
          {featured.slice(3).map(a => <Card key={a.id} article={a} />)}
        </div>
      </div>
      <div className="section-head">
        <h2>Latest stories</h2>
        <a className="btn" href="/sitemap">Browse all</a>
      </div>
      <div className="grid">
        {more.map(a => <Card key={a.id} article={a} />)}
      </div>
    </div>
  )
}