import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

const sections = ["India","World","Business","Technology","Science","Health","Sports","Entertainment","Education","Opinion","Lifestyle","Environment"]

export default function Header(){
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const primary = sections.slice(0, 8)
  const overflow = sections.slice(8)

  return (
    <header className="header">
      <div className="container bar">
        <Link className="brand" to="/" aria-label="The Times Express home">
          <img className="logo" src="/logo.svg" alt="The Times Express logo" />
          <div className="name">The Times Express</div>
        </Link>

        <nav className="nav nav-desktop" aria-label="Primary">
          {primary.map(s => (
            <NavLink key={s} to={`/section/${s.toLowerCase()}`} className={({isActive}) => isActive ? "active" : ""}>
              {s}
            </NavLink>
          ))}
          <div className="dropdown" onMouseLeave={() => setMoreOpen(false)}>
            <button className="btn btn-ghost" onMouseEnter={() => setMoreOpen(true)} onClick={() => setMoreOpen(v=>!v)}>
              More ▾
            </button>
            {moreOpen && (
              <div className="menu">
                {overflow.map(s => (
                  <NavLink key={s} to={`/section/${s.toLowerCase()}`} className={({isActive}) => isActive ? "active" : ""}>
                    {s}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="controls">
          <Link className="btn" to="/search">Search</Link>
          <button className="btn btn-ghost nav-toggle" onClick={() => setOpen(v=>!v)} aria-label="Open menu">☰</button>
        </div>
      </div>

      {open && (
        <div className="nav-mobile container">
          {sections.map(s => (
            <NavLink key={s} to={`/section/${s.toLowerCase()}`} onClick={()=>setOpen(false)} className={({isActive}) => isActive ? "active" : ""}>
              {s}
            </NavLink>
          ))}
          <Link className="btn" to="/search" onClick={()=>setOpen(false)}>Search</Link>
        </div>
      )}
    </header>
  )
}