import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {SeedPacking} from "./SeedPacking";
import {PackingService} from "./Packing.service";
import {SeedPackingListReply} from "./SeedPackingListReply";
import {SeedGenericReply} from "./SeedGenericReply";
import {PackService} from "./Pack.service";
import {SeedPackListReply} from "./SeedPackListReply";

@Component({
  moduleId: module.id,
  selector: 'my-packing',
  templateUrl: './packing.component.html',
  styleUrls: [ './packing.component.css' ]
})
export class PackingComponent implements OnInit {
  packingList: SeedPackingListReply = new SeedPackingListReply();
  packingNew: SeedPacking = new SeedPacking();
  results: SeedGenericReply = new SeedGenericReply();
  packList: SeedPackListReply = new SeedPackListReply();

  constructor(private packingService: PackingService, private packService: PackService, private router: Router) { }

  ngOnInit(): void {

    this.packService.getPacks()
      .then(retPacks => {
        this.packList = retPacks;
        return this.packingService.getPackings()
      })

      .then(retPackings => this.packingList = retPackings);
  }

  add(): void {
    this.packingService.create(this.packingNew)
      .then(rep => {
        this.results = rep;
        this.packingNew.packingId = null;
        this.packingNew.packId = null;
        this.packingNew.weight = null;
        this.packingNew.amount = null;
        return this.reload();
      })
  }

  restore(id: number): void {
    this.packingNew = this.packingList.packings[id-1];
    this.packingNew.used = "true";
    return this.add();
  }

  delete(id: number): void {
    this.packingService.delete(id)
      .then(deleteRequestAnswer => {
        this.results = deleteRequestAnswer;
        return this.reload();
      })
  }

  reload():void {
    this.packingService.getPackings()
      .then(retPlocations => this.packingList = retPlocations);
  }

}
