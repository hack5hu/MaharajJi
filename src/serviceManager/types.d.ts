export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PagedResponse<T> {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  content: T[];
}

export interface ApiError {
  success: boolean;
  status: number;
  message: string;
  path?: string;
  details?: any;
  timestamp?: string;
}

export interface LoginRequest {
  phoneNumber: string;
}

export interface LoginResponse {
  message: string;
  status: string;
}

export interface VerifyOtpRequest {
  phoneNumber: string;
  otp: string;
}

export interface VerifyOtpResponse {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  role: string;
}

export interface CreateSessionRequest {
  title: string;
  description: string;
  sessionDate: string; 
  location: string;
  totalTokens: number;
  maxPeoplePerToken: number;
  bookingOpenDate: string;
  bookingOpenTime: string;
  bookingCloseTime: string;
}

export interface LocationData {
  id: string;
  name: string;
  description: string;
  active: boolean;
  createdAt: string;
}

export interface AdminSession {
  id: string;
  title: string;
  description: string;
  sessionDate: string;
  location: string;
  bookingOpenDate?: string;
  bookingOpenTime?: string;
  bookingCloseTime?: string;
  totalTokens: number;
  maxPeoplePerToken: number;
  confirmedBookings: number;
  availableTokens: number;
  totalPeopleBooked: number;
  status: string;
  sessionState?: string | null;
  createdByAdminId: string;
  createdByAdminName: string;
  createdAt: string;
}

export interface AddCustomerRequest {
  phoneNumber: string;
  name: string;
  location: string;
}

export interface AdminCustomer {
  id?: string;
  phoneNumber: string;
  name: string;
  location?: string;
  status?: string;
  createdAt?: string;
}

export interface CustomerBooking {
  id: string;
  sessionId: string;
  sessionTitle: string;
  sessionDate: string;
  location: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  numberOfPeople: number;
  status: string;
  bookedAt: string;
}
