import { CompanyReviewService } from './../company-review.service';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { HttpParams } from '@angular/common/http';
import { param } from 'jquery';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  companyId: string="";
  company!: Company; 
  companyReviews: any[] = [];

  constructor(private route: ActivatedRoute, private companyService: 
    CompanyService,private companyReviewService:CompanyReviewService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.companyId = params['companyId'];
      this.fetchCompanyDetails();
    });
  }

  fetchCompanyDetails(): void {
    this.companyService.getCompanyDetails(this.companyId)
      .subscribe(
        (company) => {
          this.company = company;
          this.fetchCompanyReviews();
        },
        (error) => {
          console.error('Error fetching company details:', error);
        }
      );
  }
  fetchCompanyReviews(): void {
    this.companyReviewService.getReviewsByCompanyId(+this.companyId).subscribe(
      (reviews) => {
        this.companyReviews = reviews;
      },
      (error) => {
        console.error('Error fetching company reviews:', error);
      }
    );
  }
  getAverageStarRating(reviews: any[]): string[] {
    const averageRating = this.calculateAverageRating(reviews);
    return this.getStarRating(averageRating);
  }
  
  calculateAverageRating(reviews: any[]): number {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return reviews.length > 0 ? totalRating / reviews.length : 0;
  }
  
  getStarRating(rating: number): string[] {
    const roundedRating = Math.round(rating);
    return Array.from({ length: 5 }, (_, index) => index < roundedRating ? 'star' : 'star_border');
  }
}


