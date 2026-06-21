import { axiosClient } from './axiosClient';
import { ApiEndpoint } from './endpoints';
import { CreateSessionRequest, AdminSession, ApiResponse, LocationData } from './types.d';

export const SessionService = {
  createSession: async (payload: CreateSessionRequest): Promise<ApiResponse<AdminSession>> => {
    try {
      const response = await axiosClient.post<ApiResponse<AdminSession>>(
        ApiEndpoint.CREATE_SESSION,
        payload
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  fetchAllAdminSessions: async (): Promise<ApiResponse<AdminSession[]>> => {
    try {
      const response = await axiosClient.get<AdminSession[]>(ApiEndpoint.ADMIN_ALL_SESSIONS);
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

  cancelSession: async (sessionId: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosClient.patch(`${ApiEndpoint.CANCEL_SESSION}/${sessionId}/cancel`);
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

  getLocations: async (): Promise<ApiResponse<LocationData[]>> => {
    try {
      const response = await axiosClient.get<LocationData[]>(ApiEndpoint.GET_LOCATIONS);
      // The API returns a raw array, we wrap it in our ApiResponse format
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};
