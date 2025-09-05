import { useParams } from 'react-router-dom'
import data from '../data/articles.json'
import Card from '../components/Card.jsx'

export default function Section(){
  const { sectionSlug } = useParams()
  const sectionName = sectionSlug.charAt(0).toUpperCase() + sectionSlug.slice(1)
  const list = data.filter(a => a.section.toLowerCase() === sectionSlug)
  return (
    <div>
      <div className="section-head">
        <h2>{sectionName}</h2>
        <div className="meta">{list.length} articles</div>
      </div>
      <div className="list">
        {list.map(a => <Card key={a.id} article={a} />)}
      </div>
    </div>
  )
}