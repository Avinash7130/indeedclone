import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl='https://localhost:7261/api/Company'

  constructor(private httpclient:HttpClient) { }
  getAllCompany():Observable<any>
  {
    debugger
    return this.httpclient.get<any>("https://localhost:7261/api/Company");
  }
  getAllCompaniesWithReviews(): Observable<Company[]> {
    return this.httpclient.get<Company[]>("https://localhost:7261/api/CompanyReview/all-with-reviews");
  }
  
  getReviewsByCompanyId(companyId: number): Observable<any> {
    return this.httpclient.get("https://localhost:7261/api/companyreview/company/${companyId}/reviews");
  }
 
  getCompanyDetails(companyId: string): Observable<Company> {
    debugger
    
    return this.httpclient.get<Company>(`${this.apiUrl}/${companyId}/details`);
  }
  saveCompany(company:Company):Observable<any>
  {
    return this.httpclient.post<any>(this.apiUrl,company);
  }
  updateCompany(company:Company):Observable<any>
  {
    return this.httpclient.put<any>(this.apiUrl,company);
  }
  deleteCompany(id:number):Observable<any>
  {
    return this.httpclient.delete<any>(this.apiUrl+id);
  }
  searchCompanies(searchTerm: string): Observable<Company[]> {
    
    return this.httpclient.get<Company[]>(`${this.apiUrl}/search?term=${searchTerm}`);
  }
  
}
