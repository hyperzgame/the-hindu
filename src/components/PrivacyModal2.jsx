import React from 'react'

export default function PrivacyModal({ open, onClose, onAccept }){
  if (!open) return null
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <header>
          <h3>Privacy Policy</h3>
          
        </header>
        <div className="content">
          <p>
            This website is a static, It does not collect personal data,
            set tracking cookies, or run advertising. Links to external sites may have their own policies.
            Images may come from public placeholder sources.
          </p>
        </div>
        <footer>
          <button className="btn secondary" onClick={onClose}>Close</button>
          <button className="btn" onClick={onAccept}>Accept</button>
        </footer>
      </div>
    </div>
  )
}
