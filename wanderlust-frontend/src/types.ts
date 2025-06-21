export interface User {
  id: string;
  username: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  username: string;
  password: string;
  signUpCode: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface UploadResponse {
  filePath: string;
  filename: string;
}