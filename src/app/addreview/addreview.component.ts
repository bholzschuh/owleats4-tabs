import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Review } from '../models/review';
import { AuthService } from '../services/auth.service';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-addreview',
  templateUrl: './addreview.component.html',
  styleUrls: ['./addreview.component.scss']
})
export class AddreviewComponent implements OnInit {

  reviewForm: FormGroup;
  rid: string;
  message: string;
  review = {} as Review;
  uid: string;

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController,
    private fb: FormBuilder,
    private auth: AuthService,
    private reviewService: ReviewService,
  ) { }

  ngOnInit() {
    this.rid = this.navParams.get('rid');
    this.createForm();
    this.uid = this.auth.getUID();
  }

  createForm() {
    this.reviewForm = this.fb.group({
      name: ['', Validators.required],
      rating: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  addReview(review) {
    this.review.uid = this.uid;
    this.reviewService.addReview(this.rid, review);
    this.popoverController.dismiss();
  }

}
