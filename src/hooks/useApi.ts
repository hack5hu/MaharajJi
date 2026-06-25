import { useState, useCallback } from 'react';
import axios from 'axios';
import type { ApiResponse, ApiError } from '@/serviceManager/types';

export interface UseApiResult<TRequest, TResponse> {
  isLoading: boolean;
  data: TResponse | null;
  error: ApiError | null;
  execute: (payload: TRequest) => Promise<{ success: boolean; data?: TResponse; error?: ApiError }>;
}

export function useApi<TRequest, TResponse>(
  serviceMethod: (payload: TRequest) => Promise<ApiResponse<TResponse>>
): UseApiResult<TRequest, TResponse> {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const execute = useCallback(
    async (payload: TRequest) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await serviceMethod(payload);
        
        if (!response.success) {
          const apiError: ApiError = {
            success: false,
            status: 400,
            message: typeof response.error === 'string' ? response.error : (response.error?.message || 'An error occurred'),
          };
          setError(apiError);
          setIsLoading(false);
          return { success: false, error: apiError };
        }

        setData(response.data ?? null);
        setIsLoading(false);
        return { success: true, data: response.data };
      } catch (err: unknown) {
        setIsLoading(false);
        let apiError: ApiError = {
          success: false,
          status: 500,
          message: 'An unexpected error occurred.',
        };

        if (axios.isAxiosError(err)) {
          if (err.response) {
            const errData = err.response.data;
            apiError = {
              success: errData?.success ?? false,
              status: errData?.status ?? err.response.status,
              message: errData?.message ?? err.message,
              path: errData?.path ?? err.config?.url,
              details: errData?.details ?? null,
              timestamp: errData?.timestamp,
            };
          } else {
            apiError.message = err.message;
          }
        } else if (err instanceof Error) {
          apiError.message = err.message;
        }

        setError(apiError);
        return { success: false, error: apiError };
      }
    },
    [serviceMethod]
  );

  return {
    isLoading,
    data,
    error,
    execute,
  };
}
