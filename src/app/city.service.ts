import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from './city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient: HttpClient) { }
  getAllCity(): Observable<any> 
  {
    return this.httpClient.get<any>("https://localhost:7261/api/City");
   
    
  }

  saveCity(city: City): Observable<any> 
  {
    return this.httpClient.post<any>("https://localhost:7261/api/City", city);
  }
  updateCity(city: City):Observable<any>
  {
    return this.httpClient.put<any>("https://localhost:7261/api/City",city);
  }
  deleteCity(id:number):Observable<any>
  {
    return this.httpClient.delete<any>("https://localhost:7261/api/City/"+id);
  }
}
