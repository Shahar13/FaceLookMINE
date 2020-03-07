import { Component, OnInit } from "@angular/core";
// import { postsFilterService } from "../models/postsFilter.model";
import { postApiService } from '../../service/postApi.service';
import { ToastInjector } from "ngx-toastr";

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

  constructor(
    // public postsFilterService: postsFilterService,
    private _postApiService: postApiService,
    // public toastr: ToastInjector
    ) { }

  ngOnInit() { }

  search() {
    console.log("SERACH FORM DATA ==>");
    console.log(this.postsFilter);
    
    
    //obj created dynamically 
    if (Object.keys(this.postsFilter).length > 0) {
      console.log("TEST");
      
      //filter by radius
      if(this.postsFilter.radiusFrom){
        navigator.geolocation.getCurrentPosition((positionCallback) => {

          this.postsFilter.positionCallback = {
            latitude: positionCallback.coords.latitude,
            longitude: positionCallback.coords.longitude
          };

          let tempSub = this._postApiService.getFilterPosts(this.postsFilter).subscribe();
          console.log("tempSub " + tempSub);
          
        },
        err =>{
          // this._toast.error(err);
          // this._toast
          // this.toastr.error(error.message, "Error in feed search");
          // this.toastr.get("Error in feed search");
          alert(err);
        })
      }
      else{
       this._postApiService.getFilterPosts(this.postsFilter).subscribe();
      }

      
    }
  }
}
