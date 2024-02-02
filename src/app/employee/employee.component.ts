import { Component } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Observable, ReplaySubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import Swal from 'sweetalert2';
import { City } from '../city';
import { event } from 'jquery';
import { Router } from '@angular/router';
import { Company } from '../company';
import { CompanyService } from '../company.service';







@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
  
})
export class EmployeeComponent {
 
  employeesList: Employee[] = [];
  newEmployee:Employee=new Employee();
  editEmployee:Employee=new Employee();
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  form: FormGroup;
  imagePreview: string | null = null;
  
  selectedFile: File | null = null;
  page:number=1;
  itePerPage:number=5;
  companies: Company[] = [];

  
 
  constructor(private employeeService: EmployeeService,private companyService:CompanyService, private router:Router,
    
   httpclient:HttpClient , private formBuilder: FormBuilder,private _sanitizer: DomSanitizer) {
    this.form = this.formBuilder.group({
      countryId: null,
      stateId: null,
      cityId: null
      
    });
  }
 
  ngOnInit() {
     if(sessionStorage.getItem('currentuser')==null)
    {
      alert('you are not authorize to access this information !!!');
      this.router.navigateByUrl("/login");
    }
   
    this.getAll();
    this.getCountries();
   this.fetchCompanies();


  }
 
  onPageChange(newPage:number):void{
    debugger
    this.page=newPage
    this.getAll()
  }
 
  fetchCompanies() {
    debugger
    this.companyService.getAllCompany().subscribe(
      (response) => {
        this.companies = response;
      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }
  getCompanyName(companyId: number): string {
    if (this.companies && this.companies.length > 0) {
      const company = this.companies.find(c => c.id === companyId);
      return company ? company.name : 'N/A';
    } else {
      return 'N/A';
    }
  }
  getJobProfile(companyId: number): string {
    if (this.companies && this.companies.length > 0) {
      const company = this.companies.find(c => c.id === companyId);
      return company ? company.jobProfile : 'N/A';
    } else {
      return 'N/A';
    }
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
  approveApplication(employee: Employee): void {
    this.employeeService.approveApplication(employee.id).subscribe(
      () => {
        alert(`Application for ${employee.name} has been approved.`);
        this.getAll();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  rejectApplication(employee: Employee): void {
    this.employeeService.rejectApplication(employee.id).subscribe(
      () => {
        alert(`Application for ${employee.name} has been rejected.`);
        this.getAll();
      },
      (error) => {
        console.log(error);
      }
    );
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
  base64ToPdf(value:any): any  {
   
    let data = this._sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + value);
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
  onCitySelected(event: any) {
    this.newEmployee.cityId = event.target.value;
  }

  onChange(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
 }
  getAll() {
   
    this.employeeService.getAllEmployee().subscribe(
      (response) => {
        this.employeesList = response;
        // console.log('Employees List:', this.employeesList);
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
  onFileSelected(event: any, mode: string) {
    const file = event.target.files[0];
    if (mode === 'new') {
      this.newEmployee.image = file;
    } else {
      this.editEmployee.image = file;
    }
  }
  private getSelectedCityIdFromDropdown(): number {
    
    return this.newEmployee.cityId;
  }
  
  saveClick()
  {
   debugger
   const selectedCityId = this.getSelectedCityIdFromDropdown();
   this.newEmployee.cityId = selectedCityId;
    this.employeeService.saveEmployee(this.newEmployee,this.selectedFile!).subscribe(
    
      (response)=>{
        debugger
      console.log(response);
        alert('data saved')
        this.imagePreview = null;
        this.getAll();
        // this.clear_Rec();
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  updateClick() {
   
    const selectedCityId = this.getSelectedCityIdFromDropdown();
 
   
    this.newEmployee.cityId = selectedCityId;
    this.employeeService.updateEmployee(this.editEmployee, this.selectedFile!).subscribe(
      (response) => {
        alert('Data updated successfully');
        this.getAll();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  editClick(employee: any) {
    
    this.editEmployee = { ...employee };
    const selectedCityId = this.getSelectedCityIdFromDropdown();
   
   this.newEmployee.cityId = selectedCityId;
   
    const fileInput = document.getElementById('txtImage') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
  
  deleteClick(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(id).subscribe(
          (response) => {
            Swal.fire(
              'Deleted!',
              'Data has been deleted.',
              'success'
            );
            this.getAll();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
  
  
 
  

  
  
  

  getCountries() {
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
 


