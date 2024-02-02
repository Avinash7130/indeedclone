import { Token } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JwtinterceptorService } from './jwtinterceptor.service';
import { JwtModule } from '@auth0/angular-jwt';
import { CompanyComponent } from './company/company.component';
import { AppliedjobComponent } from './appliedjob/appliedjob.component';
import { CompanyReviewComponent } from './company-review/company-review.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { WritereviewComponent } from './writereview/writereview.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';








@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    HomeComponent,
    AboutComponent,
    ImageUploadComponent,
    LoginComponent,
    RegisterComponent,
    CompanyComponent,
    AppliedjobComponent,
    CompanyReviewComponent,
    CompanyDetailsComponent,
    WritereviewComponent,
    UserProfileComponent,
   
   
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatInputModule,
    CommonModule,
    MatCardModule,
   
   
  
  
    JwtModule.forRoot({
      config:
     {
      tokenGetter:()=>{
        return sessionStorage.getItem('currentuser') ?
        JSON.parse(sessionStorage.getItem('currentuser')as string).token:null;
      }
     }
    })
  
    
    
   

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtinterceptorService,
      multi:true
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
