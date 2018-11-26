import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';
import { PopoverController } from '@ionic/angular';
import { AddreviewComponent } from '../../addreview/addreview.component';

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
    public popoverController: PopoverController,
  ) { }

  ngOnInit() {
    this.rname = this.routerAct.snapshot.paramMap.get('rname');
    this.rid = this.routerAct.snapshot.paramMap.get('rid');
    this.reviews = this.reviewService.getReviews(this.rid);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: AddreviewComponent,
      event: ev,
      translucent: true,
      componentProps: {
        rid: this.rid
      },
      cssClass: 'popWidth',
    });
    return await popover.present();
  }

  getRating(rating: number) {

    let arr: number[] = [];

    for (let i = 0; i < 5; i++ , rating--) {
      if (rating > 0)
        arr.push(1);
      else
        arr.push(0);
    }

    return arr;
  }

}
