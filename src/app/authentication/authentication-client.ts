import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Registration } from "../models/registration";
import { Credentials } from "../models/credentials";
import { email } from "@angular/forms/signals";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationClient {
    private readonly httpClient = inject(HttpClient);

    private readonly BASE_API_URL = 'http://127.0.0.1:8000/users/';

    registerUser(userData: Registration): Observable<Registration> {
        return this.httpClient.post<Registration>(this.BASE_API_URL, userData);
    }

    loginUser(cred: Credentials): Observable<Credentials> {
        return this.httpClient.post<Credentials>(this.BASE_API_URL + 'login/', cred);
    }
}