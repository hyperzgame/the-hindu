import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PrivacyModal from './PrivacyModal'

export default function PrivacyGate(){
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setOpen(params.get('popup') === '1')
  }, [location])

  const close = () => {
    const params = new URLSearchParams(location.search)
    params.delete('popup')
    navigate(`${location.pathname}${params.toString() ? `?${params}` : ''}`, { replace: true })
  }

  return <PrivacyModal open={open} onClose={close} onAccept={close} />
}