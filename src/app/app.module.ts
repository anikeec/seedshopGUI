import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {LocalStorageModule} from 'angular-2-local-storage';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {GoodsComponent} from './Goods.component';
import {UsersComponent} from './users.component';
import {BasketComponent} from './basket.component';
import {SeedUserService} from './users.service';
import {GoodsService} from './Goods.service';
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
import {ManufactureComponent} from "./Manufacture.component";
import {ManufactureService} from "./Manufacture.service";
import {PackComponent} from "./Pack.component";
import {PackService} from "./Pack.service";
import {PackingComponent} from "./Packing.component";
import {PackingService} from "./Packing.service";
import {ProductComponent} from "./Product.component";
import {ProductService} from "./Product.service";
import {DeliveryStatusComponent} from "./DeliveryStatus.component";
import {DeliveryStatusService} from "./DeliveryStatus.service";

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        GoodsComponent,
        BasketComponent,
        CheckoutComponent,
        InvoiceComponent,
        CheckoutResultComponent,
        UserDetailComponent,
        InvoiceDetailComponent,
        ProductLocationComponent,
        ManufactureComponent,
        PackComponent,
        PackingComponent,
        ProductComponent,
        DeliveryStatusComponent
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
    providers: [SeedUserService,
                GoodsService,
                SeedBasketService,
                SeedInvoiceService,
                ProductLocationService,
                SeedDeliveryServiceService,
                ManufactureService,
                PackService,
                PackingService,
                ProductService,
                DeliveryStatusService],
    bootstrap: [AppComponent]
})
export class AppModule {}
