import { axiosClient } from './axiosClient';
import { ApiEndpoint } from './endpoints';
import type { LoginRequest, LoginResponse, VerifyOtpRequest, VerifyOtpResponse, ApiResponse } from './types';

export const AuthService = {
  login: async (payload: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await axiosClient.post<LoginResponse>(ApiEndpoint.AUTH_LOGIN, payload);
    return {
      success: true,
      data: response.data,
    };
  },
  verifyOtp: async (payload: VerifyOtpRequest): Promise<ApiResponse<VerifyOtpResponse>> => {
    const response = await axiosClient.post<VerifyOtpResponse>(ApiEndpoint.AUTH_VERIFY_OTP, payload);
    return {
      success: true,
      data: response.data,
    };
  },
  truecallerLogin: async (
    authorizationCode: string,
    deviceId: string | null,
    fcmToken: string | null,
    codeVerifier?: string
  ): Promise<ApiResponse<VerifyOtpResponse>> => {
    try {
      const response = await axiosClient.post<VerifyOtpResponse>(ApiEndpoint.AUTH_TRUECALLER_LOGIN, {
        authorizationCode,
        codeVerifier,
        deviceId,
        fcmToken,
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      } as any;
    }
  },
};
