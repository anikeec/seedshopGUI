import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent }      from './users.component';
import { GoodsComponent }      from './Goods.component';
import { BasketComponent }      from './basket.component';
import { CheckoutComponent }   from './checkout.component';
import {InvoiceComponent} from "./invoice.component";
import {CheckoutResultComponent} from "./checkoutResult.component";
import {UserDetailComponent} from "./userDetail.component";
import {InvoiceDetailComponent} from "./invoiceDetail.component";
import {ProductLocationComponent} from "./productLocation.component";
import {ManufactureComponent} from "./Manufacture.component";
import {PackComponent} from "./Pack.component";
import {PackingComponent} from "./Packing.component";
import {ProductComponent} from "./Product.component";
import {DeliveryStatusComponent} from "./DeliveryStatus.component";

const routes: Routes = [
  { path: '', redirectTo: '/goods', pathMatch: 'full' },
  { path: 'users',     component: UsersComponent },
  { path: 'goods',  component: GoodsComponent },
  { path: 'basket',  component: BasketComponent },
  { path: 'checkout',  component: CheckoutComponent },
  { path: 'invoice',  component: InvoiceComponent },
  { path: 'checkoutResult',  component: CheckoutResultComponent },
  { path: 'userDetail/:id',  component: UserDetailComponent },
  { path: 'invoiceDetail/:id',  component: InvoiceDetailComponent },
  { path: 'location', component: ProductLocationComponent},
  { path: 'manufacture', component: ManufactureComponent},
  { path: 'pack', component: PackComponent},
  { path: 'packing', component: PackingComponent},
  { path: 'product', component: ProductComponent},
  { path: 'dstatus', component: DeliveryStatusComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
