import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { MenuPageModule } from '../menu/menu.module';
import { ItemviewPageModule } from '../itemview/itemview.module';
import { ReviewsPageModule } from '../reviews/reviews.module';
import { CartPageModule } from '../cart/cart.module';
import { ProfilePageModule } from '../profile/profile.module';
import { RestaurantsPageModule } from '../restaurants/restaurants.module';
import { CheckoutPageModule } from '../checkout/checkout.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    ProfilePageModule,
    RestaurantsPageModule,
    CartPageModule,
    MenuPageModule,
    ItemviewPageModule,
    ReviewsPageModule,
    CheckoutPageModule,
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
