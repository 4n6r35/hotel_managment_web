import { AxiosResponse } from "axios";
import axiosInstance from "../axios-instace";
import { AuthReigsterParams } from "../interfaces/auth-register-params";

async function apiPostLogin (userEmail: string, usePassword: string): Promise<AxiosResponse<{
  successful?: boolean,
  token?: string
  message?: string
}>> {
  return axiosInstance.post('/api/user/auth', {
    email: userEmail,
    password: usePassword,
  })
}

async function apiPostRegister (registerForm: AuthReigsterParams): Promise<AxiosResponse<{ status: boolean, message: string, }>> {
  return axiosInstance.post('/api/user/register', {
    ...registerForm,
  })
}

export const authService = {
  login: apiPostLogin,
  register: apiPostRegister,
}