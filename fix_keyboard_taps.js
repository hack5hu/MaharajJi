const fs = require('fs');
const path = require('path');

const files = [
  'src/components/templates/LoginTemplate/LoginTemplate.tsx',
  'src/components/templates/HistoryTemplate/HistoryTemplate.tsx',
  'src/components/templates/OTPVerificationTemplate/OTPVerificationTemplate.tsx',
  'src/components/templates/ProfileTemplate/ProfileTemplate.tsx',
  'src/components/templates/ManageUsersTemplate/ManageUsersTemplate.tsx',
  'src/components/templates/SessionAttendeesListTemplate/SessionAttendeesListTemplate.tsx',
  'src/components/templates/AddNewCustomerTemplate/AddNewCustomerTemplate.tsx',
  'src/components/templates/HomeBookingStatusTemplate/HomeBookingStatusTemplate.tsx',
  'src/components/templates/BookSessionTemplate/BookSessionTemplate.tsx',
  'src/components/templates/ManageBookingsTemplate/ManageBookingsTemplate.tsx',
  'src/components/templates/AdminDashboardHomeTemplate/AdminDashboardHomeTemplate.tsx',
  'src/components/templates/CreateNewSessionTemplate/CreateNewSessionTemplate.tsx',
  'src/components/templates/AdminSettingsTemplate/AdminSettingsTemplate.tsx',
  'src/components/templates/MyBookingsTemplate/MyBookingsTemplate.tsx',
  'src/components/templates/BookingSuccessfulTemplate/BookingSuccessfulTemplate.tsx',
  'src/components/organisms/RecentBookingsTable/RecentBookingsTable.tsx',
  'src/components/atoms/DropdownField/DropdownField.tsx',
  'src/screens/Admin/ManageUsersAdmin/ManageUsersAdmin.screen.tsx',
  'src/screens/Admin/ManageBookings/ManageBookings.screen.tsx'
];

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;
    
    // Replace <ScrollView ...>
    content = content.replace(/<(ScrollView|FlatList|FlashList|KeyboardAwareScrollView|StyledScrollView)([\s\S]*?)>/g, (match, p1, p2) => {
      // Don't add if it already has keyboardShouldPersistTaps
      if (p2.includes('keyboardShouldPersistTaps')) {
        return match;
      }
      return `<${p1}${p2} keyboardShouldPersistTaps="handled">`;
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      updatedCount++;
      console.log(`Updated ${file}`);
    }
  }
});

console.log(`Successfully updated ${updatedCount} files.`);
