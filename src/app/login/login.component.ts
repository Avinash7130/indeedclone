import { Component } from '@angular/core';
import { Login } from '../login';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login:Login=new Login();

 constructor(private loginservice:LoginService,private router:Router){}
  loginClick()
  {
  
    this.loginservice.checkUser(this.login).subscribe(
      (response)=>{
    
        this.router.navigateByUrl("/home");
      },
      (error)=>{
        alert('wrong user/pass');
        this.login.userName="";
        this.login.password="";
      }
    );
  }
  logOutClick()
  {
    this.loginservice.LogOut();
  }

}
