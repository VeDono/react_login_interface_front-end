import { ApiResponse } from './ApiResponse';

export interface TokenResponse extends ApiResponse {
  access_token: string;
  refresh_token: string;
  token_expire: number;
  refresh_token_expire: number;
}
