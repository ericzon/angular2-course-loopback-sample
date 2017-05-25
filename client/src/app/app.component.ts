import { Component, OnInit } from '@angular/core';
import { User } from './modules/user/models/user';
import { Thingy } from './modules/object/models/thingy';
import { UserService } from './modules/user/services/user.service';
import { ThingyService } from './modules/object/services/thingy.service';
import { Thing } from './modules/shared/sdk/models/index';
import { LoopBackConfig } from './modules/shared/sdk/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: User[];
  things: Thingy[];
  allUsers: User[];
  allThings: Thingy[];
  searchTxtUser: string;
  searchTxtThing: string;

  constructor(private userService: UserService, private thingyService: ThingyService) {
    LoopBackConfig.setBaseURL("http://192.168.110.120:3000");
    LoopBackConfig.setApiVersion("api");
  }

  ngOnInit() {
    this.allUsers = this.userService.getUsers();
    this.thingyService.getThingys().subscribe((thingies: Thing[]) => {

      this.things = thingies;
    });
    this.searchTxtUser = '';
    this.searchTxtThing = '';
    this.filterUsers();
    this.filterThings();
  }

  filterUsers() {
    this.users = this.allUsers.filter((user)=> {
      let result = user.active;
      if (this.searchTxtUser) {
        result = result && (user.name.indexOf(this.searchTxtUser) !== -1);
      }
      return result;
    });
  }

  filterThings() {
    
  }

  userTxtSearch(search: string) {
    this.searchTxtUser = search;
    this.filterUsers();
  }

  // TODO: se podria hacer aqui la búsqueda
  objTxtSearch(search: string) {
    // this.things = 
    this.thingyService.getThingys(search).subscribe((things: Thing[]) => {
      this.things = things;
    });
  }

}

