import axios, { AxiosResponse } from 'axios';

import { NewPasswordData } from '../types/NewPasswordData';
import { LoginData } from '../types/LoginData';
import { TokenData } from '../types/TokenData';
import { PasswordResetData } from '../types/PasswordResetData';
import { TokenResponse } from '../types/TokenResponse';
import { ApiResponse } from '../types/ApiResponse';

const API_ENDPOINT = 'https://auth-qa.qencode.com/v1/auth';

const client = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

const login = (data: LoginData): Promise<AxiosResponse<TokenResponse>> => {
  return client.post('/login', data);
};

const getAccessToken = (
  data: TokenData,
): Promise<AxiosResponse<TokenResponse>> => {
  return client.post('/access-token', data);
};

const refreshToken = (
  data: TokenData,
): Promise<AxiosResponse<TokenResponse>> => {
  return client.post('/refresh-token', data);
};

const resetPassword = (
  data: PasswordResetData,
): Promise<AxiosResponse<ApiResponse>> => {
  return client.post('/password-reset', data);
};

const setNewPassword = (
  data: NewPasswordData,
): Promise<AxiosResponse<ApiResponse>> => {
  return client.post('/password-set', data);
};

export const authApiClient = {
  login,
  getAccessToken,
  refreshToken,
  resetPassword,
  setNewPassword,
};
