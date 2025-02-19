import { Omit_IUser_id_or_created_at_or_updated_at_, UserService } from "../../../services";
import { useApiService } from "../useApihandle";

export const useLogin = () => {
  const { handleRequest } = useApiService();

  const login = async (body: { email: string; password: string }) => {
    const data = await handleRequest(UserService.loginUser(body));
    localStorage.setItem('accessToken', data.token); 
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
