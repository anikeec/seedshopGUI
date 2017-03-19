import { Component, OnInit } from '@angular/core';

import { SeedBasketService } from './SeedBasket.service';
import { SeedAnOrderItem } from './SeedAnOrderItem';

@Component({
  moduleId: module.id,
  selector: 'my-basket',
  templateUrl: './basket.component.html',
  styleUrls: [ './basket.component.css' ]
})
export class BasketComponent implements OnInit {
  anOrders: SeedAnOrderItem[] = [];

  constructor(private seedbasketService: SeedBasketService) { }

  ngOnInit(): void {
    this.seedbasketService.getAnOrders()
      .then(anOrders => this.anOrders = anOrders);
  }
}
