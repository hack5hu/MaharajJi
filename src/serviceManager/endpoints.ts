export enum ApiEndpoint {
  AUTH_LOGIN = '/auth/login',
  AUTH_VERIFY_OTP = '/auth/verify-otp',
  CREATE_SESSION = '/sessions',
  GET_LOCATIONS = '/locations',
  ADMIN_ALL_SESSIONS = '/sessions/admin/all',
  CANCEL_SESSION = '/sessions', // base for cancel, will append /{id}/cancel
}
