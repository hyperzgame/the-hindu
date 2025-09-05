import { Link } from 'react-router-dom'
import data from '../data/articles.json'

const sections = ["India","World","Business","Technology","Science","Health","Sports","Entertainment","Education","Opinion","Lifestyle","Environment"]

export default function Sitemap(){
  return (
    <div>
      <h1>Sitemap</h1>
      <ul style={{margin:"10px 0 0 16px"}}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/privacy">Privacy</Link></li>
        <li><Link to="/terms">Terms</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/lander">Lander</Link></li>
        {sections.map(s => (
          <li key={s}><Link to={`/section/${s.toLowerCase()}`}>{s} section</Link></li>
        ))}
        {data.map(a => (
          <li key={a.id}><Link to={`/article/${a.id}`}>{a.title}</Link></li>
        ))}
      </ul>
    </div>
  )
}