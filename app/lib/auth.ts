export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: string[];
  createdAt: Date;
}

export type UserRole = 
  | 'match_official' 
  | 'journalist' 
  | 'federation' 
  | 'mys_staff' 
  | 'finance_officer' 
  | 'admin'
  | 'county_official';

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
    role: 'match_official',
    permissions: ['submit_game_report', 'player_inspection', 'view_match_schedule'],
    createdAt: new Date()
  },
  {
    id: '2',
    email: 'journalist@ncsm.lr',
    name: 'Sarah Reporter',
    role: 'journalist',
    permissions: ['post_story', 'upload_media', 'publish_results'],
    createdAt: new Date()
  },
  {
    id: '3',
    email: 'basketball@federation.lr',
    name: 'Basketball Federation',
    role: 'federation',
    permissions: ['view_players', 'add_comments', 'submit_observations'],
    createdAt: new Date()
  },
  {
    id: '4',
    email: 'lfa@federation.lr',
    name: 'Liberia Football Association',
    role: 'federation',
    permissions: ['view_players', 'add_comments', 'submit_observations'],
    createdAt: new Date()
  },
  {
    id: '5',
    email: 'kickball@federation.lr',
    name: 'Kickball Federation',
    role: 'federation',
    permissions: ['view_players', 'add_comments', 'submit_observations'],
    createdAt: new Date()
  },
  {
    id: '6',
    email: 'volleyball@federation.lr',
    name: 'Volleyball Federation',
    role: 'federation',
    permissions: ['view_players', 'add_comments', 'submit_observations'],
    createdAt: new Date()
  },
  {
    id: '7',
    email: 'mys@ncsm.lr',
    name: 'MYS Staff',
    role: 'mys_staff',
    permissions: ['review_players', 'register_players', 'edit_content', 'publish_results'],
    createdAt: new Date()
  },
  {
    id: '8',
    email: 'finance@ncsm.lr',
    name: 'Finance Officer',
    role: 'finance_officer',
    permissions: ['view_ticket_sales', 'export_reports', 'view_revenue'],
    createdAt: new Date()
  },
  {
    id: '9',
    email: 'admin@ncsm.lr',
    name: 'System Administrator',
    role: 'admin',
    permissions: ['*'], // All permissions
    createdAt: new Date()
  },
  // County Officials
  {
    id: '10',
    email: 'montserrado@ncsm.lr',
    name: 'Montserrado County Official',
    role: 'county_official',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    createdAt: new Date()
  },
  {
    id: '11',
    email: 'bong@ncsm.lr',
    name: 'Bong County Official',
    role: 'county_official',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    createdAt: new Date()
  },
  {
    id: '12',
    email: 'nimba@ncsm.lr',
    name: 'Nimba County Official',
    role: 'county_official',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    createdAt: new Date()
  },
  {
    id: '13',
    email: 'lofa@ncsm.lr',
    name: 'Lofa County Official',
    role: 'county_official',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    createdAt: new Date()
  },
  {
    id: '14',
    email: 'grand_bassa@ncsm.lr',
    name: 'Grand Bassa County Official',
    role: 'county_official',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    createdAt: new Date()
  },
  {
    id: '15',
    email: 'margibi@ncsm.lr',
    name: 'Margibi County Official',
    role: 'county_official',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    createdAt: new Date()
  },
  {
    id: '16',
    email: 'bomi@ncsm.lr',
    name: 'Bomi County Official',
    role: 'county_official',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    createdAt: new Date()
  },
  {
    id: '17',
    email: 'grand_cape_mount@ncsm.lr',
    name: 'Grand Cape Mount County Official',
    role: 'county_official',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    createdAt: new Date()
  },
  {
    id: '18',
    email: 'gbarpolu@ncsm.lr',
    name: 'Gbarpolu County Official',
    role: 'county_official',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    createdAt: new Date()
  },
  {
    id: '19',
    email: 'river_cess@ncsm.lr',
    name: 'River Cess County Official',
    role: 'county_official',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    createdAt: new Date()
  },
  {
    id: '20',
    email: 'sinoe@ncsm.lr',
    name: 'Sinoe County Official',
    role: 'county_official',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    createdAt: new Date()
  },
  {
    id: '21',
    email: 'grand_gedeh@ncsm.lr',
    name: 'Grand Gedeh County Official',
    role: 'county_official',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    createdAt: new Date()
  },
  {
    id: '22',
    email: 'river_gee@ncsm.lr',
    name: 'River Gee County Official',
    role: 'county_official',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    createdAt: new Date()
  },
  {
    id: '23',
    email: 'maryland@ncsm.lr',
    name: 'Maryland County Official',
    role: 'county_official',
    permissions: ['view_county_info', 'manage_county_players', 'update_county_content'],
    createdAt: new Date()
  }
];

export const rolePermissions: Record<UserRole, string[]> = {
  match_official: ['submit_game_report', 'player_inspection', 'view_match_schedule'],
  journalist: ['post_story', 'upload_media', 'publish_results'],
  federation: ['view_players', 'add_comments', 'submit_observations'],
  mys_staff: ['review_players', 'register_players', 'edit_content', 'publish_results'],
  finance_officer: ['view_ticket_sales', 'export_reports', 'view_revenue'],
  admin: ['*'], // All permissions
  county_official: ['view_county_info', 'manage_county_players', 'update_county_content']
};

export const roleNames: Record<UserRole, string> = {
  match_official: 'Match Official',
  journalist: 'Journalist',
  federation: 'Federation',
  mys_staff: 'MYS Staff',
  finance_officer: 'Finance Officer',
  admin: 'Administrator',
  county_official: 'County Official'
};

export const roleColors: Record<UserRole, string> = {
  match_official: 'bg-blue-500',
  journalist: 'bg-green-500',
  federation: 'bg-purple-500',
  mys_staff: 'bg-orange-500',
  finance_officer: 'bg-yellow-500',
  admin: 'bg-red-500',
  county_official: 'bg-indigo-500'
};
