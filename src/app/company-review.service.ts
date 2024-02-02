import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyReview } from './company-review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyReviewService {

  
  private apiUrl = 'https://localhost:7261'; 

  constructor(private http: HttpClient) { }

  addReview(review: CompanyReview): Observable<CompanyReview> {

    return this.http.post<CompanyReview>(`${this.apiUrl}/api/companyreview`, review);
  }

  getReviewsByCompanyId(companyId: number): Observable<CompanyReview[]> {
    return this.http.get<CompanyReview[]>(`${this.apiUrl}/api/companyreview/company/${companyId}/reviews`);
  }

  getReviewById(reviewId: number): Observable<CompanyReview> {
    return this.http.get<CompanyReview>(`${this.apiUrl}/api/companyreview/${reviewId}/details`);
  }

  updateReview(reviewId: number, review: CompanyReview): Observable<CompanyReview> {
    return this.http.put<CompanyReview>(`${this.apiUrl}/api/companyreview/${reviewId}`, review);
  }

  deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/companyreview/${reviewId}`);
  }
}

