
import { Router } from '@angular/router';
import { RegisterService } from './../register.service';
import { Component } from '@angular/core';
import { Register } from '../register';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  newUser: Register = new Register();
  userModel: any = {};

  constructor(private registerService: RegisterService,private router:Router) {}

  register() {
    debugger
    this.registerService.registerUser(this.newUser)
      .subscribe(response => {
        console.log('Registration successful:', response);
        this.router.navigateByUrl("/login");

      }, error => {
        
        console.error('Registration failed:', error);
      });
  }

}
