import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { ProfilePage } from '../profile/profile.page';
import { RestaurantsPage } from '../restaurants/restaurants.page';
import { CartPage } from '../cart/cart.page';
import { MenuPage } from '../menu/menu.page';
import { ItemviewPage } from '../itemview/itemview.page';
import { ReviewsPage } from '../reviews/reviews.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'tabs/(home:home)',
        pathMatch: 'full',
      },
      {
        path: 'home',
        outlet: 'home',
        component: RestaurantsPage
      },
      {
        path: 'menu/:rid/:rname',
        outlet: 'home',
        component: MenuPage
      },
      {
        path: 'itemview/:rid/:rname/:iid',
        outlet: 'home',
        component: ItemviewPage
      },
      {
        path: 'reviews/:rid/:rname',
        outlet: 'home',
        component: ReviewsPage
      },
      {
        path: 'profile',
        outlet: 'profile',
        component: ProfilePage
      },
      {
        path: 'cart',
        outlet: 'cart',
        component: CartPage
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/(home:home)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
