import { Link } from 'react-router-dom'
import images from '../data/images'

export default function Card({ article }){
  return (
    <Link className="card" to={`/article/${article.id}`}>
      <img loading="lazy" src={images[article.section.toLowerCase()]} alt={`${article.section} photo`} onError={(e)=>{e.currentTarget.src=`https://picsum.photos/seed/${article.id}/1200/630`}} />
      <div className="pad">
        <span className="tag">{article.section}</span>
        <div className="title">{article.title}</div>
        <div className="meta">{article.date} · {article.readingMin} min read</div>
      </div>
    </Link>
  )
}