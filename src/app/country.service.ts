import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from './country';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  apiUrl="https://localhost:7261/api/Country"


   constructor(private httpClient: HttpClient) { }
  getAllCountry(): Observable<any> 
  {
    return this.httpClient.get<any>("https://localhost:7261/api/Country");
   
    
  }
  
 

  saveCountry(country: Country): Observable<any> 
  {
    return this.httpClient.post<any>("https://localhost:7261/api/Country", country);
  }
  updateCountry(country: Country):Observable<any>
  {
    return this.httpClient.put<any>("https://localhost:7261/api/Country",country);
  }
  deleteCountry(id:number):Observable<any>
  {
    return this.httpClient.delete<any>("https://localhost:7261/api/Country/"+id);
  }
}
