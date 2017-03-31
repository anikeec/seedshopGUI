import { Component, OnInit } from '@angular/core';
import {Router, Params, ActivatedRoute} from "@angular/router";
import {SeedInvoice} from "./SeedInvoice";
import {SeedInvoiceListReply} from "./SeedInvoiceListReply";
import {SeedInvoiceService} from "./invoice.service";
import {SeedDeliveryStatusListReply} from "./SeedDeliveryStatusListReply";
import {ProductLocationService} from "./productLocation.service";
import {SeedProductLocationListReply} from "./SeedProductLocationListReply";
import {SeedDeliveryServiceService} from "./deliveryservice.service";
import {SeedDeliveryServiceListReply} from "./SeedDeliveryServiceListReply";
import {DeliveryStatusService} from "./DeliveryStatus.service";


@Component({
  moduleId: module.id,
  selector: 'my-invoiceDetail',
  templateUrl: './invoiceDetail.component.html',
  styleUrls: [ './invoiceDetail.component.css' ]
})
export class InvoiceDetailComponent implements OnInit {

  results: SeedInvoiceListReply = new SeedInvoiceListReply();
  deliveryStatuses: SeedDeliveryStatusListReply = new SeedDeliveryStatusListReply();
  productLocations: SeedProductLocationListReply = new SeedProductLocationListReply();
  deliveryServices: SeedDeliveryServiceListReply = new SeedDeliveryServiceListReply();
  invoiceTemp: SeedInvoice = new SeedInvoice();
  //invoice: SeedInvoice = new SeedInvoice();
  invoiceId: number = 0;

  constructor( private invoiceService: SeedInvoiceService,
               private locationService: ProductLocationService,
               private deliveryServService: SeedDeliveryServiceService,
               private deliveryStatusService: DeliveryStatusService,
               private route: ActivatedRoute,
               private router: Router) {

  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params)=> {
          this.invoiceId = params['id'];
          console.log("PARAMS ID: " + this.invoiceId + "<<");

          this.deliveryStatusService.getDeliveryStatuses()

            .then(
              dstatuses => {
                this.deliveryStatuses = dstatuses;
                return this.locationService.getProductLocations();
              }
            )

            .then(
              retPlocations => {
                this.productLocations = retPlocations;
                return this.deliveryServService.getDeliveryServices();
              }
            )

            .then(
              retDelivServices => {
                this.deliveryServices = retDelivServices;
                return this.invoiceService.getInvoice(this.invoiceId);
              }
            )

            .then(ret => {
                this.results = ret;
                this.invoiceTemp = ret.invoices[0];
              }
            )
      })

  }

  sendInvoiceDetail():void{
    if(this.invoiceTemp.secName.length >20)
      this.invoiceTemp.secName = this.invoiceTemp.secName.substr(0,20);

    let invoice : SeedInvoice = new SeedInvoice();
    invoice.orderId = this.invoiceTemp.orderId;
    invoice.userId = this.invoiceTemp.userId;
    invoice.orderDate = this.invoiceTemp.orderDate;
    invoice.paidDate = this.invoiceTemp.paidDate;
    invoice.sentDate = this.invoiceTemp.sentDate;
    invoice.discount = this.invoiceTemp.discount;
    invoice.pay = this.invoiceTemp.pay;
    invoice.secName = this.invoiceTemp.secName;
    invoice.firstName = this.invoiceTemp.firstName;
    invoice.thirdName = this.invoiceTemp.thirdName;
    invoice.phone = this.invoiceTemp.phone;
    invoice.declaration = this.invoiceTemp.declaration;
    invoice.country = this.invoiceTemp.country;
    invoice.region = this.invoiceTemp.region;
    invoice.area = this.invoiceTemp.area;
    invoice.city = this.invoiceTemp.city;
    invoice.delivery = this.invoiceTemp.delivery;
    invoice.deliveryOffice = this.invoiceTemp.deliveryOffice;
    invoice.prepayment = this.invoiceTemp.prepayment;
    invoice.status = this.invoiceTemp.status;
    invoice.sourceL = this.invoiceTemp.sourceL;
    invoice.destL = this.invoiceTemp.destL;
    invoice.currL = this.invoiceTemp.currL;
    invoice.backorderId = this.invoiceTemp.backorderId;
    invoice.addInfoU = this.invoiceTemp.addInfoU;
    invoice.addInfoM = this.invoiceTemp.addInfoM;


    this.invoiceService.create(invoice)
      .then(ret => {
      this.results = ret;
      if(ret.retcode == 0) {
        this.router.navigate(['/invoice']);

      }})
      .catch(error => {
      }
    );
  }

}
