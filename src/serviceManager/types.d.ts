export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
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
