'use client'

import PlayerRegistrationForm from '../../../components/forms/PlayerRegistrationForm'

export default function RegisterPlayerPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8">Register New Player</h1>
      <PlayerRegistrationForm />
    </div>
  )
}
