import { axiosClient } from './axiosClient';
import { ApiEndpoint } from './endpoints';
import type { LoginRequest, LoginResponse, VerifyOtpRequest, VerifyOtpResponse, ResendOtpRequest, ResendOtpResponse, ApiResponse } from './types';

export const AuthService = {
  login: async (payload: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    try {
      const response = await axiosClient.post<LoginResponse>(ApiEndpoint.AUTH_LOGIN, payload);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.response?.data || error.message,
      } as any;
    }
  },
  verifyOtp: async (payload: VerifyOtpRequest): Promise<ApiResponse<VerifyOtpResponse>> => {
    try {
      const response = await axiosClient.post<VerifyOtpResponse>(ApiEndpoint.AUTH_VERIFY_OTP, payload);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.response?.data || error.message,
      } as any;
    }
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
        error: error.response?.data?.message || error.response?.data || error.message,
      } as any;
    }
  },
  resendOtp: async (payload: ResendOtpRequest): Promise<ApiResponse<ResendOtpResponse>> => {
    try {
      const response = await axiosClient.post<ResendOtpResponse>(ApiEndpoint.AUTH_RESEND_OTP, payload);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.response?.data || error.message,
      } as any;
    }
  },
  deleteAccount: async (): Promise<ApiResponse<{ message: string }>> => {
    try {
      const response = await axiosClient.delete<{ message: string }>(ApiEndpoint.AUTH_DELETE_ACCOUNT);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.response?.data || error.message,
      } as any;
    }
  },
};
