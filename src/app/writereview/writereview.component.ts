import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyReviewService } from '../company-review.service';
import { CompanyReview } from '../company-review';

@Component({
  selector: 'app-writereview',
  templateUrl: './writereview.component.html',
  styleUrls: ['./writereview.component.scss']
})
export class WritereviewComponent {
  companyId!: number;
  rating!: number;
  comment!: string;

  constructor(
    private route: ActivatedRoute,
    private reviewService: CompanyReviewService,
    private router:Router
  ) {}

 
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.companyId = +params['companyId'] || 0;
    });
  }

  setRating(selectedRating: number): void {
    this.rating = selectedRating;
  }

  submitReview(): void {
    const newReview: CompanyReview = {
      id: 0,
      companyId: this.companyId,
      rating: this.rating,
      comment: this.comment,
      createdAt: new Date()
    };

    this.reviewService.addReview(newReview).subscribe(
      (review) => {
        console.log('Review submitted successfully:', review);
        this.router.navigate(['/home']); 
      },
      (error) => {
        console.error('Error submitting review:', error);
      }
    );
  }
}