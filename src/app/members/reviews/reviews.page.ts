import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

  reviews: Observable<Review[]>;
  rname: string;
  rid: string;

  constructor(
    private routerAct: ActivatedRoute,
    private reviewService: ReviewService,
  ) { }

  ngOnInit() {
    this.rname = this.routerAct.snapshot.paramMap.get('rname');
    this.rid = this.routerAct.snapshot.paramMap.get('rid');
    this.reviewService.getReviews(this.rid).subscribe(res => {
      console.log(res);
    });
  }

}
