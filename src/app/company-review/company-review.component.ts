import { Component, OnInit } from '@angular/core';
import { CompanyReview } from '../company-review';
import { CompanyReviewService } from '../company-review.service';
import { CompanyService } from '../company.service';
import { Company } from '../company';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-company-review',
  templateUrl: './company-review.component.html',
  styleUrls: ['./company-review.component.scss']
})
export class CompanyReviewComponent implements OnInit {

  companiesWithReviews: Company[] = [];
  searchControl = new FormControl('');
  searchTerm: string = '';
  

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
   
    this.fetchCompaniesWithReviews();
    this.filterCompanies();
    
    if (this.searchControl) {
      this.searchControl.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(() => {
        this.filterCompanies();
      });
    }
    this.searchControl = new FormControl('');

  }
  toggleReviews(company: Company): void {
    company.showReviews = !company.showReviews;
  }
  getStarRating(rating: number): string[] {
    const roundedRating = Math.round(rating);
    return Array.from({ length: 5 }, (_, index) => index < roundedRating ? 'star' : 'star_border');
  }
  calculateAverageRating(reviews: CompanyReview[]): number {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return reviews.length > 0 ? totalRating / reviews.length : 0;
  }

  getAverageStarRating(reviews: CompanyReview[]): string[] {
    const averageRating = this.calculateAverageRating(reviews);
    return this.getStarRating(averageRating);
  }
  onSearchInputChange(): void {
    console.log('Search term:', this.searchControl.value);
    this.filterCompanies();
  }
  
  filterCompanies(): void {
    const searchTerm = (this.searchControl.value || '').toLowerCase().trim();
  
    this.companiesWithReviews.forEach(company => {
      const showCompany =
        company.name.toLowerCase().includes(searchTerm) ||
        company.jobProfile.toLowerCase().includes(searchTerm) ||
        company.location.toLowerCase().includes(searchTerm);
      company.showCompany = showCompany;
    });
  }

  fetchCompaniesWithReviews(): void {
  
    this.companyService.getAllCompaniesWithReviews()
      .subscribe(
        (companies) => {
          
          this.companiesWithReviews = companies;
          this.filterCompanies();
        },
        (error) => {
          console.error('Error fetching companies with reviews:', error);
        }
      );
  }
}

  
