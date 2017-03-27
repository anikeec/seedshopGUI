import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent }      from './users.component';
import { ProductsComponent }      from './products.component';
import { BasketComponent }      from './basket.component';
import { CheckoutComponent }   from './checkout.component';
import {InvoiceComponent} from "./invoice.component";
import {CheckoutResultComponent} from "./checkoutResult.component";
import {UserDetailComponent} from "./userDetail.component";
import {InvoiceDetailComponent} from "./invoiceDetail.component";
import {ProductLocationComponent} from "./productLocation.component";
import {ManufactureComponent} from "./Manufacture.component";
import {PackComponent} from "./Pack.component";

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'users',     component: UsersComponent },
  { path: 'products',  component: ProductsComponent },
  { path: 'basket',  component: BasketComponent },
  { path: 'checkout',  component: CheckoutComponent },
  { path: 'invoice',  component: InvoiceComponent },
  { path: 'checkoutResult',  component: CheckoutResultComponent },
  { path: 'userDetail/:id',  component: UserDetailComponent },
  { path: 'invoiceDetail/:id',  component: InvoiceDetailComponent },
  { path: 'location', component: ProductLocationComponent},
  { path: 'manufacture', component: ManufactureComponent},
  { path: 'pack', component: PackComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
