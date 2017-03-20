import { Component, OnInit } from '@angular/core';

import {SeedInvoiceService} from "./SeedInvoice.service";
import {SeedInvoice} from "./SeedInvoice";

@Component({
  moduleId: module.id,
  selector: 'my-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: [ './invoice.component.css' ]
})
export class InvoiceComponent implements OnInit {
  invoices: SeedInvoice[] = [];

  constructor(private seedinvoiceService: SeedInvoiceService) { }

  ngOnInit(): void {
    this.seedinvoiceService.getInvoices()
      .then(invoices => this.invoices = invoices);
  }
}
