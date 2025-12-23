import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { API_BASE_URL } from "../constants";
import {LoginCredentials, LoginResponse, UserCreate, UserRead} from './models/user_models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationClient {
    private readonly httpClient = inject(HttpClient);

    private readonly BASE_URL = API_BASE_URL + '/users';

    registerUser(userData: UserCreate): Observable<UserCreate> {
        return this.httpClient.post<UserCreate>(this.BASE_URL, userData);
    }

    loginUser(cred: LoginCredentials): Observable<LoginResponse> {
        return this.httpClient.post<LoginResponse>(this.BASE_URL + '/login', cred);
    }

    getCurrentUser(): Observable<UserRead> {
      return this.httpClient.get<UserRead>(this.BASE_URL + '/current');
    }
}
