import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent }      from './users.component';
import { UserDetailComponent }  from './user-detail.component';
import { ProductsComponent }      from './products.component';
import { BasketComponent }      from './basket.component';
import { CheckoutComponent }   from './checkout.component';
import {InvoiceComponent} from "./invoice.component";

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'detail/:id', component: UserDetailComponent },
  { path: 'users',     component: UsersComponent },
  { path: 'products',  component: ProductsComponent },
  { path: 'basket',  component: BasketComponent },
  { path: 'checkout',  component: CheckoutComponent },
  { path: 'invoice',  component: InvoiceComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
