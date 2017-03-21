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
import {UserDetailComponent} from './user-detail.component';
import {BasketComponent} from './basket.component';
import {SeedUserService} from './SeedUser.service';
import {SeedProductService} from './SeedProduct.service';
import {SeedBasketService} from "./SeedBasket.service";
import {CheckoutComponent} from "./checkout.component";
import {InvoiceComponent} from "./invoice.component";
import {SeedInvoiceService} from "./SeedInvoice.service";
import {CheckoutResultComponent} from "./checkoutResult.component";

@NgModule({
    declarations: [
        AppComponent,
        UserDetailComponent,
        UsersComponent,
        ProductsComponent,
        BasketComponent,
        CheckoutComponent,
        InvoiceComponent,
        CheckoutResultComponent
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
    providers: [SeedUserService, SeedProductService, SeedBasketService, SeedInvoiceService],
    bootstrap: [AppComponent]
})
export class AppModule {}
