export interface CountyCredential {
  id: string;
  county: string;
  username: string;
  password: string;
  group: string;
  superintendent: string;
  email: string;
  phone: string;
}

export const countyCredentials: CountyCredential[] = [
  {
    id: '1',
    county: 'Bong',
    username: 'bong_county',
    password: 'Bong2025!',
    group: 'A',
    superintendent: 'Esther Walker',
    email: 'bong.county@ncsm.gov.lr',
    phone: '+231-770-123-456'
  },
  {
    id: '2',
    county: 'Montserrado',
    username: 'montserrado_county',
    password: 'Montserrado2025!',
    group: 'A',
    superintendent: 'John Doe',
    email: 'montserrado.county@ncsm.gov.lr',
    phone: '+231-770-123-457'
  },
  {
    id: '3',
    county: 'Nimba',
    username: 'nimba_county',
    password: 'Nimba2025!',
    group: 'A',
    superintendent: 'Sarah Johnson',
    email: 'nimba.county@ncsm.gov.lr',
    phone: '+231-770-123-458'
  },
  {
    id: '4',
    county: 'Bomi',
    username: 'bomi_county',
    password: 'Bomi2025!',
    group: 'A',
    superintendent: 'Michael Brown',
    email: 'bomi.county@ncsm.gov.lr',
    phone: '+231-770-123-459'
  },
  {
    id: '5',
    county: 'Grand Bassa',
    username: 'grandbassa_county',
    password: 'GrandBassa2025!',
    group: 'B',
    superintendent: 'Elizabeth Wilson',
    email: 'grandbassa.county@ncsm.gov.lr',
    phone: '+231-770-123-460'
  },
  {
    id: '6',
    county: 'Gbarpolu',
    username: 'gbarpolu_county',
    password: 'Gbarpolu2025!',
    group: 'B',
    superintendent: 'David Taylor',
    email: 'gbarpolu.county@ncsm.gov.lr',
    phone: '+231-770-123-461'
  },
  {
    id: '7',
    county: 'Grand Gedeh',
    username: 'grandgedeh_county',
    password: 'GrandGedeh2025!',
    group: 'B',
    superintendent: 'Jennifer Davis',
    email: 'grandgedeh.county@ncsm.gov.lr',
    phone: '+231-770-123-462'
  },
  {
    id: '8',
    county: 'Grand Kru',
    username: 'grandkru_county',
    password: 'GrandKru2025!',
    group: 'B',
    superintendent: 'Robert Miller',
    email: 'grandkru.county@ncsm.gov.lr',
    phone: '+231-770-123-463'
  },
  {
    id: '9',
    county: 'Lofa',
    username: 'lofa_county',
    password: 'Lofa2025!',
    group: 'C',
    superintendent: 'Patricia Anderson',
    email: 'lofa.county@ncsm.gov.lr',
    phone: '+231-770-123-464'
  },
  {
    id: '10',
    county: 'Maryland',
    username: 'maryland_county',
    password: 'Maryland2025!',
    group: 'C',
    superintendent: 'Thomas Garcia',
    email: 'maryland.county@ncsm.gov.lr',
    phone: '+231-770-123-465'
  },
  {
    id: '11',
    county: 'Margibi',
    username: 'margibi_county',
    password: 'Margibi2025!',
    group: 'C',
    superintendent: 'Lisa Martinez',
    email: 'margibi.county@ncsm.gov.lr',
    phone: '+231-770-123-466'
  },
  {
    id: '12',
    county: 'River Gee',
    username: 'rivergee_county',
    password: 'RiverGee2025!',
    group: 'C',
    superintendent: 'James Rodriguez',
    email: 'rivergee.county@ncsm.gov.lr',
    phone: '+231-770-123-467'
  },
  {
    id: '13',
    county: 'Rivercess',
    username: 'rivercess_county',
    password: 'Rivercess2025!',
    group: 'D',
    superintendent: 'Amanda Thompson',
    email: 'rivercess.county@ncsm.gov.lr',
    phone: '+231-770-123-468'
  },
  {
    id: '14',
    county: 'Sinoe',
    username: 'sinoe_county',
    password: 'Sinoe2025!',
    group: 'D',
    superintendent: 'Christopher Lee',
    email: 'sinoe.county@ncsm.gov.lr',
    phone: '+231-770-123-469'
  },

];

// Helper function to get county by username
export const getCountyByUsername = (username: string): CountyCredential | undefined => {
  return countyCredentials.find(cred => cred.username === username);
};

// Helper function to get county by ID
export const getCountyById = (id: string): CountyCredential | undefined => {
  return countyCredentials.find(cred => cred.id === id);
};

// Helper function to validate credentials
export const validateCredentials = (username: string, password: string): CountyCredential | null => {
  const county = countyCredentials.find(cred => 
    cred.username === username && cred.password === password
  );
  return county || null;
};

// Helper function to get counties by group
export const getCountiesByGroup = (group: string): CountyCredential[] => {
  return countyCredentials.filter(cred => cred.group === group);
};
