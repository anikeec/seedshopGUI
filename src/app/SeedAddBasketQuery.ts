import { SeedAnOrderItem } from './SeedAnOrderItem';

export class SeedAddBasketQuery{
    products: SeedAnOrderItem[];

    constructor (products: SeedAnOrderItem[]) {
      this.products = products;
    }
}


