import { Observable, observable } from 'rxjs';
import { Component } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appliedjob',
  templateUrl: './appliedjob.component.html',
  styleUrls: ['./appliedjob.component.scss']
})
export class AppliedjobComponent {
  newEmployee:Employee=new Employee();
  selectedFile: File | null = null;
  selectedResumeFile:File|null=null;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  form: FormGroup;
  imagePreview: string | null = null;
 resumePreview: string | null = null;

  companyName: string = ''; 
  constructor(private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,private router:Router,
    
    httpclient:HttpClient , private formBuilder: FormBuilder,private _sanitizer: DomSanitizer){
      this.form = this.formBuilder.group({
        countryId: null,
        stateId: null,
        cityId: null
        
      });
    }
    ngOnInit(): void {
      this.getCountries(); 
      const companyId = this.activatedRoute.snapshot.queryParams['companyId'];
      const companyName = this.activatedRoute.snapshot.queryParams['companyName'];
      this.newEmployee.companyId = companyId;
      // this.newEmployee.companyName = companyName;
    }
  
  
    convertFile(file: File): Observable<string> {
    
      const reader = new FileReader();
    
      return new Observable((observer) => {
        reader.onloadend = () => {
          observer.next(reader.result as string);
          observer.complete();
        };
        reader.readAsDataURL(file);
      });
    }
    
    onNewEmployeeImageChange(event: any) {
      debugger
      const file: File = event.target.files[0];
      this.selectedFile = file;
      this.convertFile(file).subscribe((base64: string) => {
        this.imagePreview = base64;
      });
    }

    base64ToImg(value:any): any  {
     
      let data=this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
                   + value);
         return data;
    }
    
    onCountryChange(event:any) {
      
     let id= event.target.value;
        this.getStates(id);
      
    }
    
    onStateChange(event:any) {
  
      let id = event.target.value;
      
        this.getCities(id);
      
    }
    onResumeSelected(event: any) {
      const resumeFile = event.target.files[0];
      this.selectedResumeFile = resumeFile;
      this.convertFile(resumeFile).subscribe((base64: string) => {
        this.resumePreview = base64;
      });  
  }
    onCitySelected(event: any) {
      this.newEmployee.cityId = event.target.value;
    }
  
    onChange(event: any) {
      const file: File = event.target.files[0];
      this.selectedFile = file;
   }
  
    onFileSelected(event: any, mode: string) {
      const file = event.target.files[0];
      if 
      (mode === 'new') {
        this.newEmployee.image = file;
      } 
      // else {
      //   this.editEmployee.image = file;
      // }
    }
  
  
    private getSelectedCityIdFromDropdown(): number {
      
      return this.newEmployee.cityId;
    }
    private getSelectedCountryId(): number {
      
      return this.newEmployee.companyId;
    }
    
    saveClick()
    {
     const selectedCityId = this.getSelectedCityIdFromDropdown();
     this.newEmployee.cityId = selectedCityId;
     const selectedCompanyId=this.getSelectedCountryId();
     this.newEmployee.companyId=selectedCompanyId;
      this.employeeService.saveEmployee(this.newEmployee,this.selectedFile!, this.selectedResumeFile!).subscribe(
      
        (response)=>{
          debugger
        console.log(response);
          alert('data saved')
          this.imagePreview = null;
        
        },
        (error)=>{
          console.log(error);
        }
      );
    }
  
   
    
   
    
    
   
    
  
    
    
    
  
    getCountries() {
      debugger
      this.employeeService.getCountries().subscribe(
        (response) => {
          this.countries = response;
          console.log('Countries:', this.countries);
        },
        (error) => {
          console.error('Error fetching countries:', error);
        }
      );
    }
  
    getStates(countryId: number) {
      debugger
      this.employeeService.getStates(countryId).subscribe(
        (response) => {
          debugger
          this.states = response;
          console.log('States:', this.states);
        },
        (error) => {
          console.error('Error fetching states:', error);
        }
      ); 
    }
  
    getCities(stateId: number) {
      debugger
      this.employeeService.getCity(stateId).subscribe(
        (response) => {
          debugger
          this.cities = response;
          console.log('Cities:', this.cities);
        },
        (error) => {
          console.error('Error fetching cities:', error);
        }
      );
    }
  }
   
  
  
  
   

