'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export default function PortfolioPage() {
  const [user, setUser] = useState<any>(null)
  const [investissements, setInvestissements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      const { data } = await supabase
        .from('investissements')
        .select('*, vehicules(nom)')
        .order('date_investissement', { ascending: false })

      setInvestissements(data || [])
      setLoading(false)
    }
    init()
  }, [])

  const total = investissements.reduce((sum, s) => sum + s.montant, 0)

  if (loading) return <div style={{ padding: '40px' }}>Chargement...</div>
  if (!user) return <div style={{ padding: '40px' }}>Non connecté. <a href="/">Se connecter</a></div>

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <a href="/dashboard" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>← Retour</a>
          <h1 style={{ fontSize: '24px', color: '#1a1a1a' }}>Mon portfolio</h1>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <p style={{ color: '#666', fontSize: '12px', marginBottom: '4px' }}>TOTAL INVESTI</p>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#534AB7' }}>
            {(total / 1000000).toFixed(2)}M€
          </p>
          <p style={{ color: '#999', fontSize: '13px' }}>{investissements.length} investissements</p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9f9f9' }}>
                {['SOCIÉTÉ', 'VÉHICULE', 'SECTEUR', 'ROUND', 'MONTANT', 'DATE', 'STATUT'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: h === 'MONTANT' ? 'right' : 'left', fontSize: '11px', color: '#999', fontWeight: '500' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {investissements.map((s, i) => (
                <tr key={s.id} style={{ borderTop: '1px solid #f0f0f0', backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                  <td style={{ padding: '16px 20px', fontWeight: '500', color: '#1a1a1a' }}>{s.nom_societe}</td>
                  <td style={{ padding: '16px 20px', color: '#666', fontSize: '14px' }}>{s.vehicules?.nom}</td>
                  <td style={{ padding: '16px 20px', color: '#666', fontSize: '14px' }}>{s.secteur}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ backgroundColor: '#EEEDFE', color: '#534AB7', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>
                      {s.round}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'right', fontWeight: '500', color: '#1a1a1a' }}>
                    {s.montant.toLocaleString('fr-FR')} €
                  </td>
                  <td style={{ padding: '16px 20px', color: '#666', fontSize: '14px' }}>
                    {new Date(s.date_investissement).toLocaleDateString('fr-FR')}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ backgroundColor: '#E1F5EE', color: '#0F6E56', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>
                      {s.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}