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
