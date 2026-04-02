'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

const KYC_ITEMS = [
  {
    id: '1',
    category: 'Personne physique',
    items: [
      { id: '1a', name: "Pièce d'identité", description: "CNI, passeport ou titre de séjour — copie recto-verso en cours de validité", status: 'Validé' },
      { id: '1b', name: "Justificatif de domicile", description: "Facture de service public ou avis d'imposition < 3 mois", status: 'Validé' },
      { id: '1c', name: "Origine des fonds", description: "Déclaratif ou sur base documentée", status: 'En attente' },
      { id: '1d', name: "Déclaration PPE / US Person", description: "Auto-déclaration signée + vérification liste PPE", status: 'Validé' },
    ]
  },
  {
    id: '2',
    category: 'Personne morale',
    items: [
      { id: '2a', name: "Kbis < 3 mois", description: "Ou équivalent étranger — vérification existence légale", status: 'Validé' },
      { id: '2b', name: "Registre des bénéficiaires effectifs (RBE)", description: "Toute personne détenant > 25% du capital + CNI de chaque bénéficiaire", status: 'En attente' },
      { id: '2c', name: "Statuts à jour", description: "Pour structures complexes : organigramme complet jusqu'aux personnes physiques", status: 'Manquant' },
      { id: '2d', name: "Pouvoir du signataire", description: "Délégation de pouvoir ou PV du conseil si non représentant légal", status: 'Validé' },
      { id: '2e', name: "Origine des fonds", description: "Déclaratif ou sur base documentée", status: 'En attente' },
    ]
  },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  'Validé':     { bg: '#E1F5EE', color: '#0F6E56' },
  'En attente': { bg: '#FAEEDA', color: '#854F0B' },
  'Manquant':   { bg: '#FCEBEB', color: '#A32D2D' },
}

export default function KYCPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }: any) => setUser(user))
  }, [])

  if (!user) return (
    <div style={{ padding: '40px' }}>
      Non connecté. <a href="/">Se connecter</a>
    </div>
  )

  const allItems = KYC_ITEMS.flatMap(c => c.items)
  const validated = allItems.filter(i => i.status === 'Validé').length
  const total = allItems.length

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <a href="/dashboard" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>← Retour</a>
          <h1 style={{ fontSize: '24px', color: '#1a1a1a' }}>Mon KYC</h1>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: '#666', fontSize: '12px', marginBottom: '4px' }}>PROGRESSION</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#534AB7' }}>{validated}/{total} documents validés</p>
          </div>
          <div style={{ width: '200px', height: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${(validated / total) * 100}%`, height: '100%', backgroundColor: '#534AB7', borderRadius: '4px' }} />
          </div>
        </div>

        {KYC_ITEMS.map(category => (
          <div key={category.id} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
            <div style={{ padding: '16px 20px', backgroundColor: '#f9f9f9', borderBottom: '1px solid #eee' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a' }}>{category.category}</h2>
            </div>
            {category.items.map((item, i) => (
              <div key={item.id} style={{
                padding: '20px',
                borderTop: i > 0 ? '1px solid #f0f0f0' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: i % 2 === 0 ? 'white' : '#fafafa'
              }}>
                <div style={{ flex: 1, marginRight: '20px' }}>
                  <p style={{ fontWeight: '500', color: '#1a1a1a', marginBottom: '4px', fontSize: '14px' }}>{item.name}</p>
                  <p style={{ color: '#999', fontSize: '12px' }}>{item.description}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    backgroundColor: STATUS_STYLE[item.status]?.bg,
                    color: STATUS_STYLE[item.status]?.color,
                    padding: '4px 10px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    fontWeight: '500',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.status}
                  </span>
                  {item.status !== 'Validé' && (
                    <button style={{
                      padding: '6px 14px',
                      backgroundColor: '#534AB7',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}>
                      Envoyer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}

      </div>
    </div>
  )
}