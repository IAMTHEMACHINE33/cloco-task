import { Omit_IUser_id_or_created_at_or_updated_at_, UserService, IUser } from "../../../services";
import { useApiService } from "../useApihandle";

export const useLogin = () => {
  const { handleRequest } = useApiService();

  const login = async (body: { email: string; password: string }) => {
        const data = await handleRequest(UserService.loginUser(body));
        if (data?.token){
            localStorage.setItem('accessToken', data.token); 
            const userInfo = await handleRequest(UserService.getUserDetails())
            localStorage.setItem('role', userInfo.data.role)
        }
        return data;
    };

    return { login };
};

export const useRegister = () => {
    const { handleRequest } = useApiService();

    const register = async (body: Omit_IUser_id_or_created_at_or_updated_at_) => {
        const data = await handleRequest(UserService.registerUser(body));
        return data;
    };

    return { register };
};

export const useGetUsers = () => {
    const { handleRequest, isLoading } = useApiService();

    const apiHit = async (pageNumber: number, rowsPerPage: number) => {
        const data = await handleRequest(UserService.getUser(pageNumber, rowsPerPage));
        return data;
    };

    return { apiHit, isLoading };
};

export const useDeleteUser = () => {
    const { handleRequest } = useApiService();

    const apiHit = async(userId: string) => {
        const data = await handleRequest(UserService.deleteUser(userId))
        return data;
    }

    return { apiHit };
}

export const useEditUser = () => {
    const { handleRequest } = useApiService();

    const apiHit = async(userId: string, updated_body: Partial<IUser>) => {
        const data = await handleRequest(UserService.updateUser(userId, updated_body))
        return data;
    }

    return { apiHit };
}

