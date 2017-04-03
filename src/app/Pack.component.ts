import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {SeedPack} from "./SeedPack";
import {PackService} from "./Pack.service";
import {SeedPackListReply} from "./SeedPackListReply";
import {SeedGenericReply} from "./SeedGenericReply";
import {Response} from "@angular/http";

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
      .then(retPacks => {
        this.packList = retPacks;
        this.results = retPacks;
      });
  }

  add(): void {
    this.packService.create(this.packNew)
      .then(rep => {
        this.results = rep;
		if(rep.retcode == 0) {
        this.packNew.packId = null;
        this.packNew.name = null;
        return this.reload();
		}
      })
      .catch((err:Response) => {
        this.errorHandler(err);
      });
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
	  if(deleteRequestAnswer.retcode == 0) {
        return this.reload();
		}
      })
      .catch((err:Response) => {
        this.errorHandler(err);
      });
  }

  reload():void {
    this.packService.getPacks()
      .then(retPacks => {
        this.packList = retPacks;
        this.results = retPacks;
      })
      .catch((err:Response) => {
      this.errorHandler(err);
      });
  }

  errorHandler(err:Response) {
    if(err.status == 401) {
      this.results.apiVer = null;
      this.results.error_message = 'You have not access to this function. Please enter Login and Password.'
    }
  }

}
