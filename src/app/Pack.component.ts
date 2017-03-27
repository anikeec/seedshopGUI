import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {SeedPack} from "./SeedPack";
import {PackService} from "./Pack.service";
import {SeedPackListReply} from "./SeedPackListReply";
import {SeedGenericReply} from "./SeedGenericReply";

@Component({
  moduleId: module.id,
  selector: 'my-pack',
  templateUrl: './pack.component.html',
  styleUrls: [ './pack.component.css' ]
})
export class PackComponent implements OnInit {
  packList: SeedPackListReply = new SeedPackListReply();
  packNew: SeedPack = new SeedPack();
  results: SeedGenericReply = new SeedGenericReply();

  constructor(private packService: PackService, private router: Router) { }

  ngOnInit(): void {
    this.packService.getPacks()
      .then(retPacks => this.packList = retPacks);
  }

  add(): void {
    this.packService.create(this.packNew)
      .then(rep => {
        this.results = rep;
        this.packNew.packId = null;
        this.packNew.name = null;
        return this.reload();
      })
  }

  restore(id: number): void {
    this.packNew = this.packList.packs[id-1];
    this.packNew.used = "true";
    return this.add();
  }

  delete(id: number): void {
    this.packService.delete(id)
      .then(deleteRequestAnswer => {
        this.results = deleteRequestAnswer;
        return this.reload();
      })
  }

  reload():void {
    this.packService.getPacks()
      .then(retPlocations => this.packList = retPlocations);
  }
}
