import { SeedInvoice }                from './SeedInvoice';

export class SeedAddInvoiceQuery{
   sessionId: string;
   invoice: SeedInvoice;

  constructor (sessId : string, invoice: SeedInvoice) {
    this.sessionId = sessId;
    this.invoice = invoice;
  }
}


