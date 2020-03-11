import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { UsersService } from "../../service/users.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  users: any = [];
  subscriptionGet: Subscription;
  subscriptionPost: Subscription;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.subscriptionGet = this.usersService.getAllUsers()
    .subscribe((res)=>{
      this.users = res;
    })
  }

  ngOnDestroy() {
    this.subscriptionGet.unsubscribe();
  }

}
