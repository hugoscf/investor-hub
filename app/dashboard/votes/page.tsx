'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

type Vote = {
  id: string
  company: string
  sector: string
  round: string
  amount: number
  total_raise: number
  deadline: string
  description: string
  status: string
  user_vote: string | null
}

const MOCK_VOTES: Vote[] = [
  {
    id: '1',
    company: 'TechStart',
    sector: 'SaaS',
    round: 'Seed',
    amount: 500000,
    total_raise: 3000000,
    deadline: '2026-04-15',
    description: 'Plateforme B2B de gestion RH pour PME. Croissance MRR +25% sur 6 mois.',
    status: 'open',
    user_vote: null
  },
  {
    id: '2',
    company: 'GreenEnergy',
    sector: 'Cleantech',
    round: 'Série A',
    amount: 800000,
    total_raise: 8000000,
    deadline: '2026-04-20',
    description: 'Solution de stockage d\'énergie pour collectivités. 3 contrats signés.',
    status: 'open',
    user_vote: null
  },
]

export default function VotesPage() {
  const [user, setUser] = useState<any>(null)
  const [votes, setVotes] = useState<Vote[]>(MOCK_VOTES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  const handleVote = (id: string, choice: 'for' | 'against') => {
    setVotes(votes.map(v =>
      v.id === id ? { ...v, user_vote: v.user_vote === choice ? null : choice } : v
    ))
  }

  if (loading) return <div style={{ padding: '40px' }}>Chargement...</div>
  if (!user) return <div style={{ padding: '40px' }}>Non connecté. <a href="/">Se connecter</a></div>

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px', gap: '16px' }}>
          <a href="/dashboard" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>
            ← Retour
          </a>
          <h1 style={{ fontSize: '24px', color: '#1a1a1a' }}>Votes investissements</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {votes.map((vote) => (
            <div key={vote.id} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '28px',
              border: vote.user_vote ? '2px solid #534AB7' : '1px solid #eee'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '20px', color: '#1a1a1a', marginBottom: '4px' }}>{vote.company}</h2>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ fontSize: '12px', backgroundColor: '#EEEDFE', color: '#534AB7', padding: '2px 8px', borderRadius: '10px' }}>
                      {vote.sector}
                    </span>
                    <span style={{ fontSize: '12px', backgroundColor: '#f0f0f0', color: '#666', padding: '2px 8px', borderRadius: '10px' }}>
                      {vote.round}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#534AB7' }}>
                    {(vote.amount / 1000000).toFixed(1)}M€
                  </p>
                  <p style={{ fontSize: '12px', color: '#999' }}>sur {(vote.total_raise / 1000000).toFixed(0)}M€ levés</p>
                </div>
              </div>

              <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                {vote.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: '12px', color: '#999' }}>
                  Date limite : {new Date(vote.deadline).toLocaleDateString('fr-FR')}
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => handleVote(vote.id, 'for')}
                    style={{
                      padding: '10px 24px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '500',
                      fontSize: '14px',
                      backgroundColor: vote.user_vote === 'for' ? '#0F6E56' : '#E1F5EE',
                      color: vote.user_vote === 'for' ? 'white' : '#0F6E56',
                    }}
                  >
                    Pour
                  </button>
                  <button
                    onClick={() => handleVote(vote.id, 'against')}
                    style={{
                      padding: '10px 24px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '500',
                      fontSize: '14px',
                      backgroundColor: vote.user_vote === 'against' ? '#A32D2D' : '#FCEBEB',
                      color: vote.user_vote === 'against' ? 'white' : '#A32D2D',
                    }}
                  >
                    Contre
                  </button>
                </div>
              </div>

              {vote.user_vote && (
                <p style={{ marginTop: '12px', fontSize: '13px', color: '#534AB7', textAlign: 'right' }}>
                  Vote enregistré : {vote.user_vote === 'for' ? 'Pour' : 'Contre'}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}