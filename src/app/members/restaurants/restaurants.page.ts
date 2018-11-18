import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Vendor } from '../../models/vendor';


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {

  vendors: Observable<Vendor[]>;

  constructor(
    private menuservice: MenuService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.vendors = this.menuservice.getVendors();
  }

  getMenu(vendor) {
    console.log(vendor);
    let url = 'members/tabs/(home:menu/' + vendor.rid + "/" + vendor.name + ')';
    this.route.navigateByUrl(url);
  }

}
