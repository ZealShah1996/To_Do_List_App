import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  baseurl:string="http://localhost:4000";
  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    debugger;
    return this.http.post<any>(`${this.baseurl}/users/login`, {username: username, password: password})
      .pipe(map(user => {
       debugger;
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }
}
