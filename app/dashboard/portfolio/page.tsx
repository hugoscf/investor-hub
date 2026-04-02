'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

const MOCK_PORTFOLIO = [
  { id: '1', company: 'Enrise', sector: 'Renewable Energy', round: 'Seed', amount: 800000, date: '2025-03-21', status: 'Actif' },
  { id: '2', company: 'WeeFin', sector: 'Finance', round: 'Série B', amount: 500000, date: '2025-02-21', status: 'Actif' },
  { id: '3', company: 'Argile', sector: 'AI / Immobilier', round: 'Seed', amount: 350000, date: '2025-01-25', status: 'Actif' },
  { id: '4', company: "Fungu'it", sector: 'Agri-food', round: 'Pre-Seed', amount: 600000, date: '2024-12-19', status: 'Actif' },
  { id: '5', company: 'Darwin', sector: 'Impact', round: 'Pre-Seed', amount: 450000, date: '2024-07-19', status: 'Actif' },
]

export default function PortfolioPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }: any) => setUser(user))
  }, [])

  const total = MOCK_PORTFOLIO.reduce((sum, s) => sum + s.amount, 0)

  if (!user) return (
    <div style={{ padding: '40px' }}>
      Non connecté. <a href="/">Se connecter</a>
    </div>
  )

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
          <p style={{ color: '#999', fontSize: '13px' }}>{MOCK_PORTFOLIO.length} investissements</p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9f9f9' }}>
                {['SOCIÉTÉ', 'SECTEUR', 'ROUND', 'MONTANT', 'DATE', 'STATUT'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: h === 'MONTANT' ? 'right' : 'left', fontSize: '11px', color: '#999', fontWeight: '500' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_PORTFOLIO.map((s, i) => (
                <tr key={s.id} style={{ borderTop: '1px solid #f0f0f0', backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                  <td style={{ padding: '16px 20px', fontWeight: '500', color: '#1a1a1a' }}>{s.company}</td>
                  <td style={{ padding: '16px 20px', color: '#666', fontSize: '14px' }}>{s.sector}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ backgroundColor: '#EEEDFE', color: '#534AB7', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>
                      {s.round}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'right', fontWeight: '500', color: '#1a1a1a' }}>
                    {s.amount.toLocaleString('fr-FR')} €
                  </td>
                  <td style={{ padding: '16px 20px', color: '#666', fontSize: '14px' }}>
                    {new Date(s.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ backgroundColor: '#E1F5EE', color: '#0F6E56', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>
                      {s.status}
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