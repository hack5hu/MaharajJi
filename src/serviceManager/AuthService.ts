import { axiosClient } from './axiosClient';
import { ApiEndpoint } from './endpoints';
import type { LoginRequest, LoginResponse, ApiResponse } from './types';

export const AuthService = {
  login: async (payload: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await axiosClient.post<LoginResponse>(ApiEndpoint.AUTH_LOGIN, payload);
    return {
      success: true,
      data: response.data,
    };
  },
};
