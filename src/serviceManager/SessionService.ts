import { axiosClient } from './axiosClient';
import { ApiEndpoint } from './endpoints';
import {
  CreateSessionRequest,
  AdminSession,
  ApiResponse,
  LocationData,
  PagedResponse,
  CustomerBooking,
} from './types.d';

export const SessionService = {
  createSession: async (
    payload: CreateSessionRequest,
  ): Promise<ApiResponse<AdminSession>> => {
    try {
      const response = await axiosClient.post<ApiResponse<AdminSession>>(
        ApiEndpoint.CREATE_SESSION,
        payload,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  fetchAllAdminSessions: async (
    page?: number,
    size?: number,
  ): Promise<ApiResponse<PagedResponse<AdminSession>>> => {
    try {
      const params = new URLSearchParams();
      if (page !== undefined) params.append('page', page.toString());
      if (size !== undefined) params.append('size', size.toString());

      const url = params.toString()
        ? `${ApiEndpoint.ADMIN_ALL_SESSIONS}?${params.toString()}`
        : ApiEndpoint.ADMIN_ALL_SESSIONS;

      const response = await axiosClient.get<PagedResponse<AdminSession>>(url);
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

  getMyBookings: async (
    page?: number,
    size?: number,
  ): Promise<ApiResponse<PagedResponse<CustomerBooking>>> => {
    try {
      const params = new URLSearchParams();
      if (page !== undefined) params.append('page', page.toString());
      if (size !== undefined) params.append('size', size.toString());

      const url = params.toString()
        ? `${ApiEndpoint.MY_BOOKINGS}?${params.toString()}`
        : ApiEndpoint.MY_BOOKINGS;

      const response = await axiosClient.get<PagedResponse<CustomerBooking>>(
        url,
      );
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
      const response = await axiosClient.patch(
        `${ApiEndpoint.CANCEL_SESSION}/${sessionId}/cancel`,
      );
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

  getSessionAttendees: async (
    sessionId: string,
  ): Promise<ApiResponse<CustomerBooking[]>> => {
    try {
      const response = await axiosClient.get<CustomerBooking[]>(
        `${ApiEndpoint.SESSION_ATTENDEES}/${sessionId}/bookings`,
      );
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

  getLocations: async (): Promise<ApiResponse<LocationData[]>> => {
    try {
      const response = await axiosClient.get<LocationData[]>(
        ApiEndpoint.GET_LOCATIONS,
      );
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

  getCustomerSessions: async (): Promise<ApiResponse<AdminSession[]>> => {
    try {
      const response = await axiosClient.get<AdminSession[]>(
        ApiEndpoint.CUSTOMER_SESSIONS,
      );
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

  bookSession: async (
    sessionId: string,
    numberOfPeople: number,
  ): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosClient.post(
        `${ApiEndpoint.BOOK_SESSION}/${sessionId}/book`,
        {
          numberOfPeople,
        },
      );
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

  cancelCustomerBooking: async (
    bookingId: string,
  ): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosClient.delete(
        `${ApiEndpoint.CANCEL_CUSTOMER_BOOKING}/${bookingId}`,
      );
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
