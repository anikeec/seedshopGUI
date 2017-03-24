export class SeedAnOrderItem{
    id: string;
    barcode: string;
    amount: number;
    price: string;

    constructor ( id: string,
                  barcode: string,
                  amount: number,
                  price: string){
      this.id = id;
      this.barcode = barcode;
      this.amount = amount;
      this.price = price;
    }
}


