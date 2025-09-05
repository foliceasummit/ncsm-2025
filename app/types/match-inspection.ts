// Types for match inspection
export interface MatchInspection {
  id: string
  matchId: string
  status: 'PENDING' | 'COMPLETED' | 'ISSUES'
  inspectorId: string
  createdAt: string
  updatedAt: string
  match: {
    id: string
    matchNumber: string
    date: string
    homeTeam: {
      id: string
      name: string
    }
    awayTeam: {
      id: string
      name: string
    }
    venue: {
      id: string
      name: string
    }
  }
  checklist: {
    id: string
    item: string
    status: 'PENDING' | 'PASS' | 'FAIL'
    remarks?: string
  }[]
  photos: {
    id: string
    url: string
  }[]
  inspector: {
    id: string
    name: string
  }
}
