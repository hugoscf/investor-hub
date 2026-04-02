'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: 'http://localhost:3000/dashboard',
      },
    })

    if (error) {
      setMessage('Erreur : ' + error.message)
    } else {
      setMessage('Lien envoyé ! Vérifie ta boîte mail.')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ marginBottom: '8px', fontSize: '24px', color: '#1a1a1a' }}>
          Investor Hub
        </h1>
        <p style={{ marginBottom: '32px', color: '#666', fontSize: '14px' }}>
          Connecte-toi avec ton adresse email
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="ton@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              marginBottom: '16px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#534AB7',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Envoi en cours...' : 'Recevoir le lien de connexion'}
          </button>
        </form>

        {message && (
          <p style={{
            marginTop: '16px',
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: message.includes('Erreur') ? '#ffebeb' : '#ebffeb',
            color: message.includes('Erreur') ? '#cc0000' : '#006600',
            fontSize: '14px'
          }}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
