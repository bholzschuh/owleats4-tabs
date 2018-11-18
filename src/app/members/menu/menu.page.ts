import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from '../../services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../models/item';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  items: Observable<Item[]>;
  rid: string;
  rname: string;

  constructor(
    private menuservice: MenuService,
    private routerAct: ActivatedRoute,
    private route: Router,
  ) { }

  ngOnInit() {
    this.rid = this.routerAct.snapshot.paramMap.get('rid');
    this.rname = this.routerAct.snapshot.paramMap.get('rname');
    this.items = this.menuservice.getItems(this.rid);
  }

  getItem(iid) {
    console.log(iid);
    let url = "/members/tabs/(home:itemview/" + this.rid + "/" + this.rname + "/" + iid + ")";
    this.route.navigateByUrl(url);
  }

}
