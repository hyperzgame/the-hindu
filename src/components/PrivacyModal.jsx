import React from 'react'

export default function PrivacyModal({ open, onClose, onAccept }){
  if (!open) return null
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <header>
          <h3>Privacy Policy</h3>
          <button className="btn secondary" onClick={onClose}>Close</button>
        </header>
        <div className="content">
          <p>
            This website is a static, student-built project. It does not collect personal data,
            set tracking cookies, or run advertising. Links to external sites may have their own policies.
            Images may come from public placeholder sources (e.g., picsum.photos or royalty‑free providers).
          </p>
          <p>
            The articles here are non‑real‑time demo content for coursework only.
            Do not treat the information as current reporting or advice.
          </p>
          <ul style={{margin:'10px 0 0 16px'}}>
            <li>No accounts, analytics, or targeted ads.</li>
            <li>Static pages; content does not update live.</li>
            <li>External links open in a new tab and follow their own policies.</li>
          </ul>
        </div>
        <footer>
          <button className="btn secondary" onClick={onClose}>Close</button>
          <button className="btn" onClick={onAccept}>Accept</button>
        </footer>
      </div>
    </div>
  )
}