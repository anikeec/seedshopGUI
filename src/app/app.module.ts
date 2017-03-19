import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {LocalStorageModule} from 'angular-2-local-storage';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard.component';
import {ProductsComponent} from './products.component';
import {UsersComponent} from './users.component';
import {UserDetailComponent} from './user-detail.component';
import {SeedUserService} from './SeedUser.service';
import {SeedProductService} from './SeedProduct.service';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        UserDetailComponent,
        UsersComponent,
        ProductsComponent
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
    providers: [SeedUserService, SeedProductService],
    bootstrap: [AppComponent]
})
export class AppModule {}
