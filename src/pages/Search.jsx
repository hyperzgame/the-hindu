import { useMemo, useState } from 'react'
import data from '../data/articles.json'
import Card from '../components/Card.jsx'

const uniq = (arr) => Array.from(new Set(arr))

export default function Search(){
  const [q, setQ] = useState('')
  const [focus, setFocus] = useState(false)

  const titles = useMemo(() => data.map(a => a.title), [])
  const sections = useMemo(() => uniq(data.map(a => a.section)), [])
  const tags = useMemo(() => uniq(data.map(a => a.tag)), [])

  const suggestions = useMemo(() => {
    const s = q.trim().toLowerCase()
    const pool = [
      ...titles.map(t => ({type:'Title', value:t})),
      ...sections.map(t => ({type:'Section', value:t})),
      ...tags.map(t => ({type:'Tag', value:t}))
    ]
    if (!s) {
      // recommended seeds when empty
      const rec = ['India','World','Technology','Health','Sports','Education','AI','Climate']
      return rec.map(v => ({type: v.length>3 ? 'Explore' : 'Tag', value: v}))
    }
    return pool.filter(x => x.value.toLowerCase().includes(s)).slice(0, 8)
  }, [q, titles, sections, tags])

  const results = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return data.slice(0, 30)
    return data.filter(a =>
      a.title.toLowerCase().includes(s) ||
      a.section.toLowerCase().includes(s) ||
      a.tag.toLowerCase().includes(s)
    ).slice(0, 60)
  }, [q])

  return (
    <div style={{position:'relative'}}>
      <h1>Search</h1>
      <input
        value={q} onChange={e=>setQ(e.target.value)} onFocus={()=>setFocus(true)} onBlur={()=>setTimeout(()=>setFocus(false), 150)}
        placeholder="Search articles, sections, or tags…" aria-label="Search input"
        className="btn" style={{width:"100%", padding:12, fontSize:"1rem", margin:"10px 0 14px"}}
      />

      {focus && suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((sug, i) => (
            <button key={i} className="suggestion" onMouseDown={()=>setQ(sug.value)}>
              <span className="pill">{sug.type}</span> {sug.value}
            </button>
          ))}
        </div>
      )}

      <div className="grid">
        {results.map(a => <Card key={a.id} article={a} />)}
      </div>
    </div>
  )
}