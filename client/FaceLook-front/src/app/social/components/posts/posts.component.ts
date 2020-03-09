import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { postApiService } from "../../service/postApi.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  
  posts: any = [];
  subscriptionGet: Subscription;
  subscriptionPost: Subscription;
  postIdEmmited: string;

  constructor(private postApiService: postApiService) { }
  
  ngOnInit(): void {
    this.subscriptionGet = this.postApiService.getAllPostsAsPosts()
    .subscribe((res)=>{
      this.posts = res;
    })
  }

  
  ngOnDestroy() {
    this.subscriptionGet.unsubscribe();
  }

  setLikesOfPost(post){
    if(post){
      // SEND TO DB (client updated on post comp directly)
      // console.log("THIS POST ID: " + post.post_id);
      this.subscriptionPost = this.postApiService.updateLikes(post).subscribe();
    }
  }

}
