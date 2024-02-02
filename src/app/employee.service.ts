import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 
   private apiUrl = 'https://localhost:7261/api/Employee';

  constructor(private httpClient: HttpClient) { }
  getAllEmployee(): Observable<any> 
  {
    return this.httpClient.get<any>("https://localhost:7261/api/Employee"); 
  }
  saveEmployee(employee: Employee, file?: File, resumeFile?: File): Observable<any> {
    const formData = new FormData();

    formData.append('name', employee.name);
    formData.append('address', employee.address);
    formData.append('email', employee.email);
    formData.append('designation', employee.designation);
    formData.append('department', employee.department);
    formData.append('pinCode', employee.pinCode);
    formData.append('phoneNumber', employee.phoneNumber);
    formData.append('cityId', employee.cityId.toString());
    formData.append('salary', employee.salary.toString());
    formData.append('companyId', employee.companyId.toString());

    if (!!file) {

        formData.append('imageFileName', file!, file?.name);
    }
    if (!!resumeFile) {
      formData.append('resumePath', resumeFile, resumeFile?.name);
    }
    return this.httpClient.post<any>(this.apiUrl, formData);
  }
  
  updateEmployee(employee: Employee, file?: File): Observable<any> {
    debugger
    const formData = new FormData();
    formData.append("id",employee.id.toString());
    formData.append('name', employee.name);
    formData.append('address', employee.address);
    formData.append('email', employee.email);
    formData.append('designation', employee.designation);
    formData.append('department', employee.designation);
    formData.append('pinCode', employee.pinCode);
    formData.append('cityId', employee.cityId.toString());
    formData.append('salary', employee.salary.toString());
    formData.append('salary', employee.salary.toString());
    formData.append('phoneNumber', employee.phoneNumber);
    
  
    if (!!file) {
      formData.append('imageFileName', file!, file?.name);
    }
   
    return this.httpClient.put<any>(`${this.apiUrl}/${employee.id}`, formData);
  }
  approveApplication(id: number): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/${id}/approve`, null);
  }
  
  rejectApplication(id: number): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/${id}/reject`, null);
  }
  getAppliedJobs(employeeId: number): Observable<any> {
   
    return this.httpClient.get<any>(`${this.apiUrl}/${employeeId}/applied-jobs`);
  }
  

  // saveEmployee(employee: Employee): Observable<any> 
  // {
   
  //   return this.httpClient.post<any>("https://localhost:7261/api/Employee", employee);
  // }
  // updateEmployee(employee: Employee):Observable<any>
  // {
  //   return this.httpClient.put<any>("https://localhost:7261/api/Employee",employee);
  // }
  deleteEmployee(id:number):Observable<any>
  {
    return this.httpClient.delete<any>("https://localhost:7261/api/Employee/"+id);
  }
  getImageUrl(employeeId: number): Observable<string> {
    const imageUrl = `https://localhost:7126/api/Employee/${employeeId}/image`;
    return this.httpClient.get<string>(imageUrl);
  }
  getCountries(): Observable<any> 
  {
    return this.httpClient.get<any>("https://localhost:7261/api/Country");
  }
  getStates(countryId:number): Observable<any> 
  {
    return this.httpClient.get<any>("https://localhost:7261/api/State/"+countryId);
  }
  getCity(stateid:number): Observable<any> 
  {
    return this.httpClient.get<any>("https://localhost:7261/api/City/"+stateid);
  }
 

}
