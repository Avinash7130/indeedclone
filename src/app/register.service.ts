import { Router } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from './register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
 
  

  constructor(private httpClient: HttpClient) {}
  
  registerUser(newUser: Register): Observable<any> {
   
    return this.httpClient.post<any>("https://localhost:7261/api/AccountController/register", newUser);
  }
}
