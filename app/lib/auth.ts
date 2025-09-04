export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: string[];
  countyId?: string;
  createdAt: Date;
}

export type UserRole = 
  | 'MATCH_OFFICIAL' 
  | 'JOURNALIST' 
  | 'FEDERATION' 
  | 'MYS_STAFF' 
  | 'FINANCE_OFFICER' 
  | 'GENERAL_ADMIN'
  | 'COUNTY_OFFICIAL'
  | 'LFA_OFFICIAL'
  | 'BASKETBALL_FEDERATION'
  | 'KICKBALL_FEDERATION'
  | 'VOLLEYBALL_FEDERATION'
  | 'ATHLETICS_FEDERATION';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Mock users for demonstration
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'official@ncsm.lr',
    name: 'John Referee',
    role: 'MATCH_OFFICIAL',
    permissions: ['submit_game_report', 'player_inspection', 'view_match_schedule'],
    createdAt: new Date()
  },
  {
    id: '2',
    email: 'journalist@ncsm.lr',
    name: 'Sarah Reporter',
    role: 'JOURNALIST',
    permissions: ['post_story', 'upload_media', 'publish_results'],
    createdAt: new Date()
  },
  {
    id: '3',
    email: 'basketball@federation.lr',
    name: 'Basketball Federation',
    role: 'BASKETBALL_FEDERATION',
    permissions: ['view_players', 'add_comments', 'submit_observations'],
    createdAt: new Date()
  },
  {
    id: '4',
    email: 'lfa@federation.lr',
    name: 'Liberia Football Association',
    role: 'LFA_OFFICIAL',
    permissions: ['view_players', 'add_comments', 'submit_observations'],
    createdAt: new Date()
  },
  {
    id: '5',
    email: 'kickball@federation.lr',
    name: 'Kickball Federation',
    role: 'KICKBALL_FEDERATION',
    permissions: ['view_players', 'add_comments', 'submit_observations'],
    createdAt: new Date()
  },
  {
    id: '6',
    email: 'volleyball@federation.lr',
    name: 'Volleyball Federation',
    role: 'VOLLEYBALL_FEDERATION',
    permissions: ['view_players', 'add_comments', 'submit_observations'],
    createdAt: new Date()
  },
  {
    id: '7',
    email: 'mys@ncsm.lr',
    name: 'MYS Staff',
    role: 'MYS_STAFF',
    permissions: ['review_players', 'register_players', 'edit_content', 'publish_results'],
    createdAt: new Date()
  },
  {
    id: '8',
    email: 'finance@ncsm.lr',
    name: 'Finance Officer',
    role: 'FINANCE_OFFICER',
    permissions: ['view_ticket_sales', 'export_reports', 'view_revenue'],
    createdAt: new Date()
  },
  {
    id: '9',
    email: 'admin@ncsm.lr',
    name: 'System Administrator',
    role: 'GENERAL_ADMIN',
    permissions: ['*'], // All permissions
    createdAt: new Date()
  },
  // County Officials
  {
    id: '10',
    email: 'montserrado@ncsm.lr',
    name: 'Montserrado County Official',
    role: 'COUNTY_OFFICIAL',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    countyId: 'montserrado-county',
    createdAt: new Date()
  },
  {
    id: '11',
    email: 'bong@ncsm.lr',
    name: 'Bong County Official',
    role: 'COUNTY_OFFICIAL',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    countyId: 'bong-county',
    createdAt: new Date()
  },
  {
    id: '12',
    email: 'nimba@ncsm.lr',
    name: 'Nimba County Official',
    role: 'COUNTY_OFFICIAL',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    countyId: 'nimba-county',
    createdAt: new Date()
  },
  {
    id: '13',
    email: 'lofa@ncsm.lr',
    name: 'Lofa County Official',
    role: 'COUNTY_OFFICIAL',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    countyId: 'lofa-county',
    createdAt: new Date()
  },
  {
    id: '14',
    email: 'grand_bassa@ncsm.lr',
    name: 'Grand Bassa County Official',
    role: 'COUNTY_OFFICIAL',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    countyId: 'grand-bassa-county',
    createdAt: new Date()
  },
  {
    id: '15',
    email: 'margibi@ncsm.lr',
    name: 'Margibi County Official',
    role: 'COUNTY_OFFICIAL',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    countyId: 'margibi-county',
    createdAt: new Date()
  },
  {
    id: '16',
    email: 'bomi@ncsm.lr',
    name: 'Bomi County Official',
    role: 'COUNTY_OFFICIAL',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    countyId: 'bomi-county',
    createdAt: new Date()
  },
  {
    id: '17',
    email: 'grand_cape_mount@ncsm.lr',
    name: 'Grand Cape Mount County Official',
    role: 'COUNTY_OFFICIAL',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    countyId: 'grand-cape-mount-county',
    createdAt: new Date()
  },
  {
    id: '18',
    email: 'gbarpolu@ncsm.lr',
    name: 'Gbarpolu County Official',
    role: 'COUNTY_OFFICIAL',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    countyId: 'gbarpolu-county',
    createdAt: new Date()
  },
  {
    id: '19',
    email: 'river_cess@ncsm.lr',
    name: 'River Cess County Official',
    role: 'COUNTY_OFFICIAL',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    countyId: 'river-cess-county',
    createdAt: new Date()
  },
  {
    id: '20',
    email: 'sinoe@ncsm.lr',
    name: 'Sinoe County Official',
    role: 'COUNTY_OFFICIAL',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    countyId: 'sinoe-county',
    createdAt: new Date()
  },
  {
    id: '21',
    email: 'grand_gedeh@ncsm.lr',
    name: 'Grand Gedeh County Official',
    role: 'COUNTY_OFFICIAL',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    countyId: 'grand-gedeh-county',
    createdAt: new Date()
  },
  {
    id: '22',
    email: 'river_gee@ncsm.lr',
    name: 'River Gee County Official',
    role: 'COUNTY_OFFICIAL',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    countyId: 'river-gee-county',
    createdAt: new Date()
  },
  {
    id: '23',
    email: 'maryland@ncsm.lr',
    name: 'Maryland County Official',
    role: 'COUNTY_OFFICIAL',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    countyId: 'maryland-county',
    createdAt: new Date()
  }
];

export const rolePermissions: Record<UserRole, string[]> = {
  MATCH_OFFICIAL: ['submit_game_report', 'player_inspection', 'view_match_schedule'],
  JOURNALIST: ['post_story', 'upload_media', 'publish_results'],
  FEDERATION: ['view_players', 'add_comments', 'submit_observations'],
  MYS_STAFF: ['review_players', 'register_players', 'edit_content', 'publish_results'],
  FINANCE_OFFICER: ['view_ticket_sales', 'export_reports', 'view_revenue'],
  GENERAL_ADMIN: ['*'], // All permissions
  COUNTY_OFFICIAL: ['view_county_info', 'manage_county_players', 'update_county_content'],
  LFA_OFFICIAL: ['view_players', 'add_comments', 'submit_observations'],
  BASKETBALL_FEDERATION: ['view_players', 'add_comments', 'submit_observations'],
  KICKBALL_FEDERATION: ['view_players', 'add_comments', 'submit_observations'],
  VOLLEYBALL_FEDERATION: ['view_players', 'add_comments', 'submit_observations'],
  ATHLETICS_FEDERATION: ['view_players', 'add_comments', 'submit_observations']
};

export const roleNames: Record<UserRole, string> = {
  MATCH_OFFICIAL: 'Match Official',
  JOURNALIST: 'Journalist',
  FEDERATION: 'Federation',
  MYS_STAFF: 'MYS Staff',
  FINANCE_OFFICER: 'Finance Officer',
  GENERAL_ADMIN: 'Administrator',
  COUNTY_OFFICIAL: 'County Official',
  LFA_OFFICIAL: 'LFA Official',
  BASKETBALL_FEDERATION: 'Basketball Federation',
  KICKBALL_FEDERATION: 'Kickball Federation',
  VOLLEYBALL_FEDERATION: 'Volleyball Federation',
  ATHLETICS_FEDERATION: 'Athletics Federation'
};

export const roleColors: Record<UserRole, string> = {
  MATCH_OFFICIAL: 'bg-blue-500',
  JOURNALIST: 'bg-green-500',
  FEDERATION: 'bg-purple-500',
  MYS_STAFF: 'bg-orange-500',
  FINANCE_OFFICER: 'bg-yellow-500',
  GENERAL_ADMIN: 'bg-red-500',
  COUNTY_OFFICIAL: 'bg-indigo-500',
  LFA_OFFICIAL: 'bg-blue-600',
  BASKETBALL_FEDERATION: 'bg-orange-600',
  KICKBALL_FEDERATION: 'bg-green-600',
  VOLLEYBALL_FEDERATION: 'bg-purple-600',
  ATHLETICS_FEDERATION: 'bg-red-600'
};
