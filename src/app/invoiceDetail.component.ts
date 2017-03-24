import { Component, OnInit } from '@angular/core';
import {Router, Params, ActivatedRoute} from "@angular/router";
import {SeedInvoice} from "./SeedInvoice";
import {SeedInvoiceListReply} from "./SeedInvoiceListReply";
import {SeedInvoiceService} from "./invoice.service";
import {SeedDeliveryStatusListReply} from "./SeedDeliveryStatusListReply";
import {SeedLocationService} from "./location.service";
import {SeedProductLocationListReply} from "./SeedProductLocationListReply";


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
  //invoice: SeedInvoice = new SeedInvoice();
  invoiceId: number = 0;

  constructor( private invoiceService: SeedInvoiceService,
               private locationService: SeedLocationService,
               private route: ActivatedRoute,
               private router: Router) {

  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params)=> {
          this.invoiceId = params['id'];
          console.log("PARAMS ID: " + this.invoiceId + "<<");

          this.invoiceService.getDeliveryStatuses()

            .then(
              dstatuses => {
                this.deliveryStatuses = dstatuses;
                return this.locationService.getProductLocations();
              }
            )

            .then(
              retPlocations => {
                this.productLocations = retPlocations;
                return this.invoiceService.getInvoice(this.invoiceId);
              }
            )

            .then(ret => {
                this.results = ret;
              }
            )
      })

  }

  sendInvoiceDetail(orderId: number,
                    userId: number,
                    orderDate: String,
                    paidDate: String,
                    sentDate: String,
                    discount: String,
                    pay: String,
                    secName: String,
                    firstName: String,
                    thirdName: String,
                    phone: String,
                    declaration: String,
                    country: String,
                    region: String,
                    area: String,
                    city: String,
                    delivery: number,
                    deliveryOffice: number,
                    prepayment: String,
                    status: number,
                    sourceL: number,
                    destL: number,
                    currL: number,
                    backorderId: number,
                    addInfoU: String,
                    addInfoM: String):void{
    if(secName.length >20)
      secName = secName.substr(0,20);

    let invoice : SeedInvoice = new SeedInvoice();
    invoice.orderId = orderId;
    invoice.userId = userId;
    invoice.orderDate = orderDate;
    invoice.paidDate = paidDate;
    invoice.sentDate = sentDate;
    invoice.discount = discount;
    invoice.pay = pay;
    invoice.secName = secName;
    invoice.firstName = firstName;
    invoice.thirdName = thirdName;
    invoice.phone = phone;
    invoice.declaration = declaration;
    invoice.country = country;
    invoice.region = region;
    invoice.area = area;
    invoice.city = city;
    invoice.delivery = delivery;
    invoice.deliveryOffice = deliveryOffice;
    invoice.prepayment = prepayment;
    invoice.status = status;
    invoice.sourceL = sourceL;
    invoice.destL = destL;
    invoice.currL = currL;
    invoice.backorderId = backorderId;
    invoice.addInfoU = addInfoU;
    invoice.addInfoM = addInfoM;


/*
    this.seedinvoiceService.create(invoice)
      .then(ret => {
      this.results = ret;
      if(ret.retcode == 0) {
        this.router.navigate(['/checkoutResult']);

      }})
      .catch(error => {
      }
    );
    */
  }

}
