import { Component, OnInit } from '@angular/core';
import {SeedInvoiceService} from "./invoice.service";
import {SeedInvoice} from "./SeedInvoice";
import {Router, ActivatedRoute} from "@angular/router";
import {ProductLocationService} from "./productLocation.service";
import {SeedDeliveryServiceService} from "./deliveryservice.service";
import {DeliveryStatusService} from "./DeliveryStatus.service";
import {SeedDeliveryServiceListReply} from "./SeedDeliveryServiceListReply";
import {Response} from "@angular/http";
import {SeedGenericReply} from "./SeedGenericReply";


@Component({
  moduleId: module.id,
  selector: 'my-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: [ './checkout.component.css' ]
})
export class CheckoutComponent implements OnInit {

  results: SeedGenericReply = new SeedGenericReply();
  invoiceTemp: SeedInvoice = new SeedInvoice();
  deliveryServices: SeedDeliveryServiceListReply = new SeedDeliveryServiceListReply();

  constructor( private seedinvoiceService: SeedInvoiceService,
               private locationService: ProductLocationService,
               private deliveryServService: SeedDeliveryServiceService,
               private deliveryStatusService: DeliveryStatusService,
               private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit(): void {
      this.deliveryServService.getDeliveryServices()
      .then(
        retDelivServices => {
          this.deliveryServices = retDelivServices;
        }
      )
  }

  sendInvoice():void{
    if(this.invoiceTemp.secName.length >20)
      this.invoiceTemp.secName = this.invoiceTemp.secName.substr(0,20);

    let invoice : SeedInvoice = new SeedInvoice();

    if(this.invoiceTemp.secName != null)
      invoice.secName = this.invoiceTemp.secName;
    else
      invoice.secName = null;

    if(this.invoiceTemp.firstName != null)
      invoice.firstName = this.invoiceTemp.firstName;
    else
      invoice.firstName = null;

    if(this.invoiceTemp.thirdName != null)
      invoice.thirdName = this.invoiceTemp.thirdName;
    else
      invoice.thirdName = null;


    if(this.invoiceTemp.phone != null)
      invoice.phone = this.invoiceTemp.phone;
    else
      invoice.phone = null;

    if(this.invoiceTemp.country != null)
      invoice.country = this.invoiceTemp.country;
    else
      invoice.country = null;

    if(this.invoiceTemp.region != null)
      invoice.region = this.invoiceTemp.region;
    else
      invoice.region = null;

    if(this.invoiceTemp.area != null)
      invoice.area = this.invoiceTemp.area;
    else
      invoice.area = null;

    if(this.invoiceTemp.city != null)
      invoice.city = this.invoiceTemp.city;
    else
      invoice.city = null;

    if(this.invoiceTemp.delivery != null)
      invoice.delivery = this.invoiceTemp.delivery;
    else
      invoice.delivery = null;

    if(this.invoiceTemp.deliveryOffice != null)
      invoice.deliveryOffice = this.invoiceTemp.deliveryOffice;
    else
      invoice.deliveryOffice = null;

    invoice.status = null;
    invoice.addInfoM = null;
    invoice.addInfoU = null;
    invoice.backorderId = null;
    invoice.currL = null;
    invoice.declaration = null;
    invoice.destL = null;
    invoice.discount
    invoice.orderDate = null;
    invoice.orderId = null;
    invoice.pay = null;
    invoice.prepayment = null;
    invoice.sentDate = null;
    invoice.paidDate = null;
    invoice.sourceL = null;

    this.seedinvoiceService.create(invoice)
      .then(ret => {
      this.results = ret;
      if(ret.retcode == 0) {
        this.router.navigate(['/checkoutResult']);
      }})
      .catch((err:Response) => {
        this.errorHandler(err);
      });
  }

  errorHandler(err:Response) {
    if(err.status == 401) {
      this.results.apiVer = null;
      this.results.error_message = 'You have not access to this function. Please enter Login and Password.'
    }
  }

}
