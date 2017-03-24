import { Component, OnInit } from '@angular/core';

import {SeedInvoiceService} from "./invoice.service";
import {SeedInvoice} from "./SeedInvoice";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'my-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: [ './invoice.component.css' ]
})
export class InvoiceComponent implements OnInit {
  invoices: SeedInvoice[] = [];

  constructor(private seedinvoiceService: SeedInvoiceService, private router: Router) { }

  ngOnInit(): void {
    this.seedinvoiceService.getInvoices()
      .then(invoices => this.invoices = invoices);
  }

  gotoEdit(invoiceId:number): void {
    this.router.navigate(['/invoiceDetail', invoiceId]);
  }
}
