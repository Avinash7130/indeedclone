import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor() { }
  getUserProfile(): any {
    const currentUserSession = sessionStorage.getItem('currentuser');
    const currentEmployeeSession=sessionStorage.getItem('currentemployee')
    return currentUserSession ? JSON.parse(currentUserSession) : null,
    currentEmployeeSession ? JSON.parse(currentEmployeeSession) : null;
  }


}
