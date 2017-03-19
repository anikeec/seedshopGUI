import { SeedAnOrderItem } from './SeedAnOrderItem';

export class SeedAddBasketQuery{
    sessionId: string;
    products: SeedAnOrderItem[];

    constructor (sessId : string, products: SeedAnOrderItem[]) {
      this.sessionId = sessId;
      this.products = products;
    }
}


