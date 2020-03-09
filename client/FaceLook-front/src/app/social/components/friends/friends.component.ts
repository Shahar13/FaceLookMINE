import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { FriendsService } from "../../service/friends.service";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  
  friends: any = [];
  subscriptionGet: Subscription;
  subscriptionPost: Subscription;
  friendIdEmmited: string;

  constructor(
    private friendsService: FriendsService
  ) { }

  ngOnInit() {
    this.subscriptionGet = this.friendsService.getAllfriends()
    .subscribe((res)=>{
      this.friends = res;
      console.log("this.friends ==> ");
      console.log(this.friends);
      
    })
  }

  ngOnDestroy() {
    this.subscriptionGet.unsubscribe();
  }

}
