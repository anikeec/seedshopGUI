import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {LocalStorageModule} from 'angular-2-local-storage';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ProductsComponent} from './products.component';
import {UsersComponent} from './users.component';
import {BasketComponent} from './basket.component';
import {SeedUserService} from './users.service';
import {SeedProductService} from './products.service';
import {SeedBasketService} from "./basket.service";
import {CheckoutComponent} from "./checkout.component";
import {InvoiceComponent} from "./invoice.component";
import {SeedInvoiceService} from "./invoice.service";
import {CheckoutResultComponent} from "./checkoutResult.component";
import {UserDetailComponent} from "./userDetail.component";
import {InvoiceDetailComponent} from "./invoiceDetail.component";
import {ProductLocationService} from "./productLocation.service";
import {SeedDeliveryServiceService} from "./deliveryservice.service";
import {ProductLocationComponent} from "./productLocation.component";

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        ProductsComponent,
        BasketComponent,
        CheckoutComponent,
        InvoiceComponent,
        CheckoutResultComponent,
        UserDetailComponent,
        InvoiceDetailComponent,
        ProductLocationComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        RouterModule,
        LocalStorageModule.withConfig({
            prefix: 'seedshop-app',
            storageType: 'localStorage'
        })
    ],
    providers: [SeedUserService, SeedProductService, SeedBasketService, SeedInvoiceService, ProductLocationService, SeedDeliveryServiceService],
    bootstrap: [AppComponent]
})
export class AppModule {}
