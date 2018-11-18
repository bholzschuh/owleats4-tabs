import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

  rname: string;
  rid: string;

  constructor(
    private routerAct: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.rname = this.routerAct.snapshot.paramMap.get('rname');
    this.rid = this.routerAct.snapshot.paramMap.get('rid');
  }

}
