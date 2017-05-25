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


  getThingys(searchTxt?: string) {
    // no mira tipos, mira shapes
    // let filter: LoopBackFilter = {};
    let filter: any = {};

    if (searchTxt) {
       filter.where = {
        "name": {
          "like":"%"+searchTxt+"%"
        }
      }
    }
    return this.thingApi.find(filter);
  }
}
