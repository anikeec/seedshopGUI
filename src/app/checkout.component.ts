import { Component, OnInit } from '@angular/core';
import {SeedInvoiceService} from "./SeedInvoice.service";
import {SeedInvoice} from "./SeedInvoice";
import {SeedInvoiceListReply} from "./SeedInvoiceListReply";


@Component({
  moduleId: module.id,
  selector: 'my-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: [ './checkout.component.css' ]
})
export class CheckoutComponent implements OnInit {

  results: SeedInvoiceListReply = new SeedInvoiceListReply();

  constructor( private seedinvoiceService: SeedInvoiceService) { }

  ngOnInit(): void {

  }

  sendInvoice(secName:string,
              firstName:string,
              thirdName:string,
              email:string,
              phone:string,
              country:string,
              region:string,
              area:string,
              city:string,
              deliveryService:number,
              deliveryOffice:number):void{
    if(secName.length >20)
      secName = secName.substr(0,20);

    let invoice : SeedInvoice = new SeedInvoice();
    invoice.secName = secName;
    invoice.firstName = firstName;
    invoice.thirdName = thirdName;
    invoice.phone = phone;
    invoice.country = country;
    invoice.region = region;
    invoice.area = area;
    invoice.city = city;
    invoice.delivery = deliveryService;
    invoice.deliveryOffice = deliveryOffice;

    this.seedinvoiceService.create(invoice)
      .then(ret => {
      this.results = ret;
      })
      .catch(error => {
      }
    );
  }

}
