import { Component, OnInit } from "@angular/core";
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from "ngx-toastr";

// import { postsFilterService } from "../models/postsFilter.model";
import { postApiService } from '../../service/postApi.service';

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.css"]
})
export class FeedComponent implements OnInit {
  
  public postsFilter: any = {
    fromFilter: '',
    toFilter: '',
    publisher: '',
    radiusFrom: '',
    imageTags: '',
    userTags: ''
  };
  tempSubscription: Subscription;

  constructor(
    // public postsFilterService: postsFilterService,
    private _postApiService: postApiService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  search() {
    console.log("SERACH FORM DATA ==>");
    console.log(this.postsFilter);
    
    //obj created dynamically 
    if (Object.keys(this.postsFilter).length > 0) {
      //filter by radius
      if(this.postsFilter.radiusFrom){
        navigator.geolocation.getCurrentPosition((positionCallback) => {
          this.postsFilter.positionCallback = {
            latitude: positionCallback.coords.latitude,
            longitude: positionCallback.coords.longitude
          };

          this.tempSubscription = this._postApiService.getFilterPosts(this.postsFilter).subscribe();
          console.log("tempSubscription ==>");
          console.log(this.tempSubscription);
        },
        err =>{
          this.toastr.error(err + "Error in register");
        })
      }
      else{
       this._postApiService.getFilterPosts(this.postsFilter).subscribe();
      }
    }
  }

  ngOnDestroy() {
    // this.tempSubscription.unsubscribe();
  }

}
