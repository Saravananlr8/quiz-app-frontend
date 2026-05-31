import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = 'http://localhost:5116/api/auth';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(
      `${this.apiUrl}/login`,
      data
    );
  }
  logout() {
    localStorage.removeItem('token');
  }
}
