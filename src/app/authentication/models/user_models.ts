export interface UserRead {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserCreate {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse extends LoginCredentials {
  token: string
}
