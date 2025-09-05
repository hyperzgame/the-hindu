import { useParams, Link } from 'react-router-dom'
import data from '../data/articles.json'
import images from '../data/images'

export default function Article(){
  const { id } = useParams()
  const a = data.find(x => x.id === id)
  if (!a) return <p>Article not found.</p>
  return (
    <div>
      <div className="breadcrumbs" style={{margin:"12px 0"}}>
        <Link to="/">Home</Link> › <Link to={`/section/${a.section.toLowerCase()}`}>{a.section}</Link>
      </div>
      <article className="article">
        <header>
          <h1>{a.title}</h1>
          <div className="byline">By {a.author} · {a.date} · {a.readingMin} min read · <span className="tag">{a.tag}</span></div>
        </header>
        <figure>
          <img loading="lazy" src={images[a.section.toLowerCase()]} alt={`${a.section} photo`} onError={(e)=>{e.currentTarget.src=`https://picsum.photos/seed/${a.id||a.title}/1200/630`}} />
          <figcaption className="meta" style={{padding:"8px 14px"}}>Image is a placeholder rectangle for coursework. Replace with your own media.</figcaption>
        </figure>
        <div className="prose">
          {a.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="share" style={{display:"flex", gap:10, margin:"10px 0"}}>
          <a className="btn" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(a.title)}`} rel="noopener">Share</a>
          <Link className="btn" to={`/section/${a.section.toLowerCase()}`}>Back to {a.section}</Link>
        </div>
      </article>
    </div>
  )
}