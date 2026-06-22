import { axiosClient } from './axiosClient';
import { ApiEndpoint } from './endpoints';
import { ApiResponse, AdminCustomer, AddCustomerRequest, PagedResponse } from './types.d';

export const UserService = {
  fetchAllCustomers: async (page?: number, size?: number): Promise<ApiResponse<PagedResponse<AdminCustomer>>> => {
    try {
      const pageParam = page !== undefined ? `page=${page}` : '';
      const sizeParam = size !== undefined ? `size=${size}` : '';
      const queryParams = [pageParam, sizeParam].filter(Boolean).join('&');
      
      const url = queryParams ? `${ApiEndpoint.ADMIN_CUSTOMERS}?${queryParams}` : ApiEndpoint.ADMIN_CUSTOMERS;
      
      const response = await axiosClient.get<PagedResponse<AdminCustomer>>(url);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      } as any;
    }
  },

  addCustomer: async (payload: AddCustomerRequest): Promise<ApiResponse<AdminCustomer>> => {
    try {
      const response = await axiosClient.post<AdminCustomer>(
        ApiEndpoint.ADMIN_CUSTOMERS,
        payload
      );
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      } as any;
    }
  },

  deleteCustomer: async (phoneNumber: string): Promise<ApiResponse<any>> => {
    try {
      const response = await axiosClient.delete(`${ApiEndpoint.ADMIN_CUSTOMERS}/${phoneNumber}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      } as any;
    }
  },
};
