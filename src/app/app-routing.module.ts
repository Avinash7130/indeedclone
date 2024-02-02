import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { ActivateguardService } from './activateguard.service';
import { CompanyComponent } from './company/company.component';
import { AppliedjobComponent } from './appliedjob/appliedjob.component';
import { CompanyReviewComponent } from './company-review/company-review.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { WritereviewComponent } from './writereview/writereview.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"company",component:CompanyComponent},
  {path:"employee",component:EmployeeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"about",component:AboutComponent},
  {path:"company",component:CompanyComponent},
  {path:"apply",component:AppliedjobComponent},
  {path:"review",component:CompanyReviewComponent},
  {path:"company-Details/:companyId",component:CompanyDetailsComponent},
  {path:"writereview/:companyId",component:WritereviewComponent},
  {path:"userProfile",component:UserProfileComponent},


 
  
 

  {path:"employee",component:EmployeeComponent,canActivate:[ActivateguardService]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
