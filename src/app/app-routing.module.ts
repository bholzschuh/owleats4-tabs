import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', loadChildren: './public/login/login.module#LoginPageModule' },
  {
    path: 'members',
    canActivate: [AuthGuardService],
    loadChildren: './members/tabs/tabs.module#TabsPageModule'
  },
  { path: 'register', loadChildren: './public/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'cart', loadChildren: './members/cart/cart.module#CartPageModule' },
  { path: 'menu', loadChildren: './members/menu/menu.module#MenuPageModule' },
  { path: 'itemview', loadChildren: './members/itemview/itemview.module#ItemviewPageModule' },
  { path: 'reviews', loadChildren: './members/reviews/reviews.module#ReviewsPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
