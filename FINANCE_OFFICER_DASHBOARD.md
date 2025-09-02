# NCSM Finance Officer Dashboard

## Overview
The Finance Officer Dashboard provides comprehensive financial oversight of all ticket sales, revenue tracking, and financial reporting for the National County Sports Meet (NCSM).

## Access Information

### Login URL
`/login/finance-officer`

### Demo Credentials
- **Username**: `finance_officer`
- **Password**: `Finance2025!`

### Dashboard URL
`/dashboard/finance-officer` (after authentication)

## 🔐 Role & Permissions

### Finance Officer Role
- **Title**: Finance Officer / Ticket Sales Manager
- **Department**: Finance & Revenue
- **Access Level**: Financial Data Only

### Permissions Matrix

| Feature | Permission | Description |
|---------|------------|-------------|
| **View all ticket sales** | ✅ **Yes** | Daily/weekly/monthly sales data |
| **View revenue summary** | ✅ **Yes** | By match, round, county |
| **Export financial reports** | ✅ **Yes** | PDF/Excel formats |
| **View individual purchases** | ✅ **Yes** | Detailed ticket information |
| **Refund/cancel tickets** | ❌ **No** | View only (Admin controlled) |
| **Access other modules** | ❌ **No** | Player registration, etc. |
| **Manage ticket pricing** | ❌ **No** | Admin only |

## 📊 Dashboard Features

### 1. Ticket Sales Overview Cards

#### **Total Tickets Sold Today**
- **Card Color**: Blue
- **Icon**: Ticket
- **Data**: Real-time count of tickets sold today
- **Update**: Live refresh

#### **Today's Revenue**
- **Card Color**: Green
- **Icon**: Dollar Sign
- **Data**: Total revenue generated today
- **Format**: USD currency display

#### **This Week's Revenue**
- **Card Color**: Purple
- **Icon**: Trending Up
- **Data**: Cumulative revenue for current week
- **Calculation**: Sum of last 7 days

#### **Top Selling Match**
- **Card Color**: Orange
- **Icon**: Users
- **Data**: Match with highest ticket sales
- **Details**: Match name + ticket count

### 2. Match-wise Breakdown Table

#### **Table Columns**
1. **Match Name** - e.g., "Bong vs. Lofa"
2. **Date** - Match date (YYYY-MM-DD)
3. **Tickets Sold** - Number of tickets sold
4. **Revenue Generated** - Total revenue in USD
5. **Status** - Upcoming/Complete/Cancelled
6. **County** - Host county
7. **Ticket Type** - VIP/Regular/Student/Senior

#### **Filtering Options**
- **Match Filter**: Filter by specific match names
- **County Filter**: Filter by host county
- **Ticket Type Filter**: Filter by ticket category
- **Real-time Search**: Dynamic filtering

#### **Data Display**
- **Hover Effects**: Row highlighting
- **Status Colors**: 
  - 🟢 Green: Complete
  - 🔵 Blue: Upcoming
  - 🔴 Red: Cancelled

### 3. Analytics Section

#### **Sales Trend Chart**
- **Chart Type**: Bar chart
- **Time Period**: Last 14 days
- **Data Points**: Daily revenue
- **Visualization**: Height-based bars
- **X-Axis**: Date labels (rotated for readability)
- **Y-Axis**: Revenue scale

#### **Ticket Type Distribution**
- **Chart Type**: Horizontal bar chart
- **Categories**: VIP, Regular, Student, Senior
- **Color Coding**: 
  - 🔴 VIP: Red (#FF6B6B)
  - 🟢 Regular: Green (#4ECDC4)
  - 🔵 Student: Blue (#45B7D1)
  - 🟡 Senior: Yellow (#96CEB4)
- **Data**: Count of each ticket type sold

#### **Revenue by County**
- **Display**: Grid layout
- **Format**: County name + revenue amount
- **Responsive**: Adapts to screen size
- **Color**: Green text for revenue amounts

### 4. Reports & Export

#### **Export Options**
- **PDF Export**: Red button with file icon
- **Excel Export**: Green button with download icon
- **Format**: CSV file for Excel compatibility

#### **Filter Controls**
- **Date Range**: Today/Week/Month/Quarter/Year
- **Dynamic Filtering**: Updates all data based on selection

#### **Summary Statistics**
- **Total Matches**: Count of filtered matches
- **Total Revenue**: Sum of filtered revenue
- **Total Tickets**: Sum of filtered tickets sold

## 📈 Data Sources & Calculations

### **Real-time Data**
- **Ticket Sales**: Live from ticket system
- **Revenue**: Calculated from sales × pricing
- **Status Updates**: Match completion tracking

### **Calculations**
- **Daily Revenue**: Sum of all sales for current date
- **Weekly Revenue**: Sum of last 7 days
- **Top Selling**: Maximum tickets sold across all matches
- **Low Selling**: Minimum tickets sold across all matches

### **Mock Data Structure**
```typescript
interface TicketSale {
  id: string;
  matchName: string;
  date: string;
  ticketsSold: number;
  revenue: number;
  status: 'Upcoming' | 'Complete' | 'Cancelled';
  county: string;
  ticketType: 'VIP' | 'Regular' | 'Student' | 'Senior';
  price: number;
}
```

## 🎯 User Workflow

### **Daily Operations**
1. **Login** → Access dashboard
2. **Review Overview Cards** → Check daily performance
3. **Analyze Trends** → View sales patterns
4. **Generate Reports** → Export data for stakeholders
5. **Monitor Revenue** → Track financial performance

### **Weekly Reporting**
1. **Filter by Week** → Select "This Week"
2. **Review Performance** → Analyze weekly trends
3. **Export Reports** → Generate weekly summaries
4. **Share with Management** → PDF/Excel reports

### **Monthly Analysis**
1. **Filter by Month** → Select "This Month"
2. **County Performance** → Review revenue by county
3. **Match Analysis** → Identify top performers
4. **Financial Planning** → Revenue forecasting

## 🔒 Security Features

### **Access Control**
- **Role-based Access**: Finance Officer only
- **Session Management**: localStorage authentication
- **Permission Validation**: Feature-level restrictions

### **Data Privacy**
- **Financial Data Only**: No access to other modules
- **View-only Access**: Cannot modify sales data
- **Export Controls**: Limited to authorized formats

### **Audit Trail**
- **Login Tracking**: All access attempts logged
- **Export Logging**: Report generation tracked
- **Data Access**: View history maintained

## 📱 Responsive Design

### **Mobile Optimization**
- **Responsive Grid**: Adapts to screen size
- **Touch-friendly**: Mobile-optimized controls
- **Readable Tables**: Horizontal scrolling on small screens

### **Desktop Experience**
- **Full Dashboard**: All features visible
- **Multi-column Layout**: Optimal data display
- **Advanced Filtering**: Enhanced control options

## 🚀 Performance Features

### **Data Loading**
- **Mock Data**: 15 sample matches included
- **Real-time Updates**: Live data refresh capability
- **Efficient Filtering**: Client-side data processing

### **Export Performance**
- **CSV Generation**: Fast Excel export
- **PDF Preparation**: Mock functionality ready
- **Large Dataset Support**: Handles extensive data

## 📞 Support & Contact

### **Technical Support**
- **Email**: finance@ncsm.gov.lr
- **System**: NCSM Finance Officer Dashboard
- **Access**: Restricted to finance personnel

### **Feature Requests**
- **Enhancement Requests**: Submit via support email
- **Bug Reports**: Include screenshots and steps
- **Training Needs**: Schedule with IT team

## 🔄 Future Enhancements

### **Planned Features**
- **Real-time Integration**: Live ticket system connection
- **Advanced Analytics**: Machine learning insights
- **Mobile App**: Native mobile dashboard
- **API Access**: Third-party integrations

### **Reporting Improvements**
- **Custom Reports**: User-defined report builder
- **Scheduled Exports**: Automated report delivery
- **Data Visualization**: Interactive charts and graphs
- **Historical Analysis**: Long-term trend analysis

---

**Last Updated**: December 2025  
**System**: NCSM Finance Officer Dashboard  
**Version**: 1.0  
**Access Level**: Finance Officer Only
