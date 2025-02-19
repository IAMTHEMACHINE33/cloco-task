import { ApiError } from '../../services/index.ts';
import { useCallback, useEffect, useState, useRef } from 'react';
// import * as storage from '@/utils/storage';
// import { storageKey } from '@/constants/storageKey';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useAuthXTenantId } from './useAuthDetail';

export type HandleRequestFunction = <T>(
  request: Promise<T>
) => Promise<T | undefined>;

export function useApiService() {
    const navigate = useNavigate();
    const [error, setError] = useState<ApiError | undefined>(undefined);
    const [isLoading, setIsloading] = useState<boolean>(false);

    const handleRequest = useCallback(async function <T>(request: Promise<T>) {
        setIsloading(true);
        try {
            const response = await request;
            setError(undefined);
            return response;
        } catch (exception: any) {
            setError(exception);

            if (
                exception?.status === 401 &&
                    !isToastShown?.current &&
                    isToastShownInitialized.current
            ) {
                toast.error(
                    exception.body.error.message === 'Token is expired'
                        ? 'Your session has expired. Please login again'
                        : exception.body.error.message,
                    { toastId: 'invalidTokenToast' }
                );
                navigate('/login');
                isToastShown.current = true;
            }
            throw exception;
        } finally {
            setIsloading(false);
        }
    }, []);

    return { error, isLoading, handleRequest };
}

