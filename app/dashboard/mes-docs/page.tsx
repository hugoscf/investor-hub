'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

const MOCK_DOCS = [
  { id: '1', name: 'Bulletin de souscription — Asterion F2', date: '2024-12-01', type: 'Souscription', status: 'Signé' },
  { id: '2', name: 'Bulletin de souscription — Asterion F1', date: '2023-06-15', type: 'Souscription', status: 'Signé' },
  { id: '3', name: 'LOI — Asterion F2', date: '2024-11-15', type: 'LOI', status: 'Signé' },
  { id: '4', name: 'NDA — Asterion Ventures', date: '2024-11-10', type: 'NDA', status: 'Signé' },
  { id: '5', name: 'Contrat de souscription F1', date: '2023-06-10', type: 'Contrat', status: 'Signé' },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  'Signé':      { bg: '#E1F5EE', color: '#0F6E56' },
  'Validé':     { bg: '#EEEDFE', color: '#534AB7' },
  'En attente': { bg: '#FAEEDA', color: '#854F0B' },
}

const TYPE_STYLE: Record<string, { bg: string; color: string }> = {
  'Souscription': { bg: '#EEEDFE', color: '#534AB7' },
  'LOI':          { bg: '#E6F1FB', color: '#185FA5' },
  'NDA':          { bg: '#F1EFE8', color: '#5F5E5A' },
  'Contrat':      { bg: '#FAEEDA', color: '#854F0B' },
}

export default function SouscriptionPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }: any) => setUser(user))
  }, [])

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
          <h1 style={{ fontSize: '24px', color: '#1a1a1a' }}>Mes documents</h1>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.6' }}>
            Retrouvez ici tous vos documents liés à vos souscriptions dans les véhicules Asterion Ventures — bulletins de souscription, LOI, NDA et contrats.
          </p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9f9f9' }}>
                {['DOCUMENT', 'TYPE', 'DATE', 'STATUT', ''].map((h, i) => (
                  <th key={i} style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', color: '#999', fontWeight: '500' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_DOCS.map((doc, i) => (
                <tr key={doc.id} style={{ borderTop: '1px solid #f0f0f0', backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                  <td style={{ padding: '16px 20px', fontWeight: '500', color: '#1a1a1a', fontSize: '14px' }}>{doc.name}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      backgroundColor: TYPE_STYLE[doc.type]?.bg || '#f0f0f0',
                      color: TYPE_STYLE[doc.type]?.color || '#666',
                      padding: '2px 8px', borderRadius: '10px', fontSize: '12px'
                    }}>
                      {doc.type}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', color: '#666', fontSize: '14px' }}>
                    {new Date(doc.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      backgroundColor: STATUS_STYLE[doc.status]?.bg || '#f0f0f0',
                      color: STATUS_STYLE[doc.status]?.color || '#666',
                      padding: '2px 8px', borderRadius: '10px', fontSize: '12px'
                    }}>
                      {doc.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <button style={{
                      padding: '6px 14px',
                      backgroundColor: 'transparent',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      color: '#666'
                    }}>
                      Télécharger
                    </button>
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