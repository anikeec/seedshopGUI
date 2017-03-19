export class SeedAnOrderItem{
    id: number;
    barcode: string;
    amount: number;
    price: string;

    constructor ( id: number,
                  barcode: string,
                  amount: number,
                  price: string){
      this.id = id;
      this.barcode = barcode;
      this.amount = amount;
      this.price = price;
    }
}


