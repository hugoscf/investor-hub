'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p>Chargement...</p>
    </div>
  )

  if (!user) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p>Non connecté. <a href="/">Se connecter</a></p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', color: '#1a1a1a', marginBottom: '8px' }}>
            Investor Hub
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Bienvenue, {user.email}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px' }}>
            <p style={{ color: '#666', fontSize: '12px', marginBottom: '8px' }}>VÉHICULES</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#534AB7' }}>—</p>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px' }}>
            <p style={{ color: '#666', fontSize: '12px', marginBottom: '8px' }}>MONTANT INVESTI</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#534AB7' }}>—</p>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px' }}>
            <p style={{ color: '#666', fontSize: '12px', marginBottom: '8px' }}>VOTES EN ATTENTE</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#534AB7' }}>—</p>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '16px', color: '#1a1a1a' }}>Menu</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="/dashboard/votes" style={{ padding: '16px', border: '1px solid #eee', borderRadius: '8px', textDecoration: 'none', color: '#1a1a1a' }}>
              Votes investissements
            </a>
            <a href="/dashboard/portfolio" style={{ padding: '16px', border: '1px solid #eee', borderRadius: '8px', textDecoration: 'none', color: '#1a1a1a' }}>
              Mon portfolio
            </a>
            <a href="/dashboard/souscription" style={{ padding: '16px', border: '1px solid #eee', borderRadius: '8px', textDecoration: 'none', color: '#1a1a1a' }}>
              Bulletin de souscription
            </a>
          </div>
        </div>

        <div style={{ marginTop: '24px', textAlign: 'right' }}>
          <button
            onClick={async () => { await supabase.auth.signOut(); window.location.href = '/' }}
            style={{ padding: '10px 20px', backgroundColor: 'transparent', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', color: '#666' }}
          >
            Se déconnecter
          </button>
        </div>

      </div>
    </div>
  )
}