import { Injectable } from '@angular/core';
import { ThingApi } from '../../shared/sdk/services/index';


/*
interface LoopBackFilter {
  where?: {
    name?: string;
  };

}
*/

@Injectable()
export class ThingyService {

  constructor(private thingApi: ThingApi) { }

  getThingys(searchText?: string) {
    // no mira tipos, mira shapes
    // let filter: LoopBackFilter = {};
    let filter: any = {};
    if(searchText) {
      filter = {
        "where" : {
          "name": {
            "like": "%" + searchText + "%"
          }
        }
      }
    }
    return this.thingApi.find(filter);
  }
}
