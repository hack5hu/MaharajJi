export enum ApiEndpoint {
  // COMMONS
  AUTH_LOGIN = '/auth/login',
  AUTH_VERIFY_OTP = '/auth/verify-otp',
  AUTH_TRUECALLER_LOGIN = '/auth/truecaller/login',
  GET_LOCATIONS = '/locations',

  // ADMIN
  CREATE_SESSION = '/admin/sessions',
  ADMIN_ALL_SESSIONS = '/admin/sessions',
  CANCEL_SESSION = '/admin/sessions', // base for cancel, will append /{id}/cancel
  SESSION_ATTENDEES = '/admin/sessions', // base for attendees, will append /{id}/bookings
  ADMIN_CUSTOMERS = '/admin/customers',

  // CUSTOMER
  MY_BOOKINGS = '/customer/sessions/my-bookings',
  CUSTOMER_SESSIONS = '/customer/sessions',
  BOOK_SESSION = '/customer/sessions', // base, append /{id}/book
  CANCEL_CUSTOMER_BOOKING = '/customer/sessions/bookings',
}
