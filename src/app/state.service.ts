import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from './state';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private httpClient: HttpClient) { }
  getAllState(): Observable<any> 
  {
    return this.httpClient.get<any>("https://localhost:7126/api/State");
   
    
  }

  saveState(state: State): Observable<any> 
  {
    return this.httpClient.post<any>("https://localhost:7261/api/State", state);
  }
  updateState(state: State):Observable<any>
  {
    return this.httpClient.put<any>("https://localhost:7261/api/State",state);
  }
  deleteState(id:number):Observable<any>
  {
    return this.httpClient.delete<any>("https://localhost:7261/api/State/"+id);
  }
  

  
}
