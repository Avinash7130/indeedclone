import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Login } from './login';
import { Observable, map } from 'rxjs';
import { CompanyReviewService } from './company-review.service';
import { CompanyReview } from './company-review';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userAvatar = './assets/avatar/avatar-user.jpg';
  showDropdown = false;
  currentUserName:string="";
  reviews: CompanyReview[] = [];

  constructor(public loginservice:LoginService,private companyReviewService: CompanyReviewService){}
    toggleDropdown() {
    this.showDropdown = !this.showDropdown;
   
  }
  
  LogoutClick()
  {
    this.loginservice.LogOut();
  }}
  
 