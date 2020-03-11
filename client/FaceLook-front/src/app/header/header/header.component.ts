import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  // public userSearch: any = {};
  public userSearch: string = '';
  private tempUserUserSubscription: Subscription; 

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

  searchUser(){
    console.log("this.userSearch ==> " + this.userSearch);
    // this.tempUserSubscription = this._postApiService.getFilterPosts(this.postsFilter).subscribe();
    // this.rout.navigate(['/search/' + this.userSearch]);
  }

  ngOnDestroy() {
    // this.tempUserSubscription.unsubscribe();
  }

}
