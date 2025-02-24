import { ApiError } from '../../services/index.ts';
import { useCallback, useEffect, useState, useRef } from 'react';
// import * as storage from '@/utils/storage';
// import { storageKey } from '@/constants/storageKey';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { OpenAPI } from '../../services/index.ts';
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

    // Some code that requests a token...
            const getToken = async () => {
                return localStorage.getItem('accessToken') || '';
            };
            OpenAPI.TOKEN = getToken;

            const response = await request;
            setError(undefined);
            return response;
        } catch (exception: any) {
            setError(exception);
            console.log(exception?.status)
            if (
                exception?.status === 401
            ) {
                localStorage.removeItem('accessToken')
                navigate('/login');
            }
            throw exception;
        } finally {
            setIsloading(false);
        }
    }, []);

    return { error, isLoading, handleRequest };
}

