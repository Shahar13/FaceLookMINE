import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  // public friendSearch: any = {};
  public friendSearch: string = '';
  private tempFriendSubscription: Subscription; 

  constructor(
    private rout: Router
  ) { }

  ngOnInit(): void {
  }
  
  userLogout(){
    // this.api.logout();
    localStorage.removeItem("token");
    this.rout.navigate(['/']);
  }

  searchFriend(){
    console.log("this.friendSearch ==> " + this.friendSearch);
    // this.tempFriendSubscription = this._postApiService.getFilterPosts(this.postsFilter).subscribe();
    // this.rout.navigate(['/search/' + this.friendSearch]);
  }

  ngOnDestroy() {
    this.tempFriendSubscription.unsubscribe();
  }

}
