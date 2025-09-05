import { Link } from 'react-router-dom'

const sections = ["India","World","Business","Technology","Science","Health","Sports","Entertainment","Education","Opinion","Lifestyle","Environment"]

export default function Footer(){
  const year = new Date().getFullYear()
  return (
    <div className="footer">
      <div className="container wrap">
        <div>
          <h4>About</h4>
          <p className="meta" style={{marginTop:8}}>
            <strong>The Times Express</strong> is a student-built, static news portal made for an academic project.
            It is not affiliated with any other publisher. All content here is original placeholder text.
          </p>
          <div className="notice" style={{marginTop:10}}>
            This information is not real-time; only static news are presented here.
          </div>
        </div>
        <div>
          <h4>Sections</h4>
          <ul>
            {sections.map(s => (
              <li key={s}><Link to={`/section/${s.toLowerCase()}`}>{s}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Links</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy?popup=1">Privacy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
            <li><Link to="/sitemap">Sitemap</Link></li>
          </ul>
        </div>
      </div>
      <div className="copy">© {year} The Times Express. Educational project. No affiliation with other news brands.</div>
    </div>
  )
}