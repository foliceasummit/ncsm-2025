# NCSM County Officials Login Credentials

## Overview
This document contains the login credentials for all 14 counties to access their respective County Officials Dashboards.

## Login URL
`/login/county-official`

## County Credentials

### Group A
| County | Username | Password | Superintendent | Email |
|--------|----------|----------|----------------|-------|
| Bong | `bong_county` | `Bong2025!` | Esther Walker | bong.county@ncsm.gov.lr |
| Montserrado | `montserrado_county` | `Montserrado2025!` | John Doe | montserrado.county@ncsm.gov.lr |
| Nimba | `nimba_county` | `Nimba2025!` | Sarah Johnson | nimba.county@ncsm.gov.lr |
| Bomi | `bomi_county` | `Bomi2025!` | Michael Brown | bomi.county@ncsm.gov.lr |

### Group B
| County | Username | Password | Superintendent | Email |
|--------|----------|----------|----------------|-------|
| Grand Bassa | `grandbassa_county` | `GrandBassa2025!` | Elizabeth Wilson | grandbassa.county@ncsm.gov.lr |
| Gbarpolu | `gbarpolu_county` | `Gbarpolu2025!` | David Taylor | gbarpolu.county@ncsm.gov.lr |
| Grand Gedeh | `grandgedeh_county` | `GrandGedeh2025!` | Jennifer Davis | grandgedeh.county@ncsm.gov.lr |
| Grand Kru | `grandkru_county` | `GrandKru2025!` | Robert Miller | grandkru.county@ncsm.gov.lr |

### Group C
| County | Username | Password | Superintendent | Email |
|--------|----------|----------|----------------|-------|
| Lofa | `lofa_county` | `Lofa2025!` | Patricia Anderson | lofa.county@ncsm.gov.lr |
| Maryland | `maryland_county` | `Maryland2025!` | Thomas Garcia | maryland.county@ncsm.gov.lr |
| Margibi | `margibi_county` | `Margibi2025!` | Lisa Martinez | margibi.county@ncsm.gov.lr |
| River Gee | `rivergee_county` | `RiverGee2025!` | James Rodriguez | rivergee.county@ncsm.gov.lr |

### Group D
| County | Username | Password | Superintendent | Email |
|--------|----------|----------|----------------|-------|
| Rivercess | `rivercess_county` | `Rivercess2025!` | Amanda Thompson | rivercess.county@ncsm.gov.lr |
| Sinoe | `sinoe_county` | `Sinoe2025!` | Christopher Lee | sinoe.county@ncsm.gov.lr |

## Security Features

### Password Requirements
- **Format**: `CountyName2025!`
- **Length**: 12+ characters
- **Complexity**: Includes uppercase, lowercase, numbers, and special characters
- **Pattern**: County name + Year + Exclamation mark

### Access Control
- Each county can only see their own data
- No cross-county visibility
- Secure authentication system
- Session management with localStorage

## Dashboard Features

### What Each County Official Can Do:
1. **Register Players** - Add new athletes to their county roster
2. **Register Officials** - Add coaches, managers, and support staff
3. **View Registrations** - See all their county's players and officials
4. **Match Day Lists** - Submit final player lists for games
5. **Status Dashboard** - Track approval status from LFA
6. **Generate Player Cards** - Create digital IDs for approved players

### Data Isolation:
- **County-Specific View**: Only see data from their own county
- **Group Assignment**: Automatically assigned based on county grouping
- **No Cross-Access**: Complete isolation between counties

## Support Information

### Technical Support
- **Email**: support@ncsm.gov.lr
- **System**: NCSM County Officials Dashboard
- **Access**: Restricted to county officials only

### Password Reset
- Contact NCSM Support for password reset
- Provide county name and superintendent verification
- New credentials will be issued securely

## Important Notes

1. **Keep Credentials Secure**: Do not share login information
2. **Regular Updates**: Change passwords periodically
3. **Logout**: Always log out when finished
4. **Access Monitoring**: All login attempts are logged
5. **Data Privacy**: County data is completely isolated

## Quick Access Links

- **Login Page**: `/login/county-official`
- **Dashboard**: `/dashboard/county-official` (after login)
- **Admin Credentials**: `/admin/county-credentials` (admin only)

---

**Last Updated**: December 2025  
**System**: NCSM County Officials Dashboard  
**Version**: 1.0
