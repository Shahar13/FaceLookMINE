import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { markerCollectionsService } from "../service/marker-collection.service"
import { tap } from 'rxjs/operators';

@Injectable()
export  class postApiService {
  
  url = "http://localhost:3000/social/";
  public allPosts: any = {};
  public publishersIdArr: any = {};

  constructor(
    private markersService: markerCollectionsService,
    private httpClient: HttpClient
    ) {}

  addPost(post: any) {
    return this.httpClient.post(this.url + "addPost", post);
  }

  getAllPosts(){
    return this.httpClient.get(this.url + "getPosts").pipe(
      tap((res) => {
        console.log("RES all posts");
        console.log(res);
        
        this.publishersIdArr = (<any>res).map(post => ({
          publisherId: post.publisher_id,
        }));

        const markersArr = (<any>res).map(post => ({
          postId: post.post_id,
          title: post.title,
          publisherId: post.publisher_id,
          text: post.text,
          image: post.image,
          lat: post.latitude,
          lng: post.longitude,
          likes: post.likes,
          date: post.date,
        }));
        // console.log("res",markersArr);
        this.markersService.markers$.next(markersArr);
      })
    );
  }

  getFilterPosts(filters){
    console.log("FILTERS");
    console.log(filters);
    
    return this.httpClient.get(this.url + `filterPosts\\${JSON.stringify(filters)}`).pipe(
      tap((res) => {
        const markersArr = (<any>res).map(post => ({
          postId: post.post_id,
          title: post.title,
          publisherId: post.publisher_id,
          text: post.text,
          image: post.image,
          lat: post.latitude,
          lng: post.longitude,
          likes: post.likes,
          date: post.date,
        }));

        this.markersService.markers$.next(markersArr);
      })
    );
  }

  updateLikes(post){
    return this.httpClient.patch(this.url + "updateLikes", {post});
  }

  getAllPostsAsPosts(){
    return this.httpClient.get(this.url + "getPosts").pipe(
      tap((res) => {
        const postsArr = (<any>res).map(post => ({
          postId: post.post_id,
          title: post.title,
          publisherId: post.publisher_id,
          text: post.text,
          image: post.image,
          lat: post.latitude,
          lng: post.longitude,
          likes: post.likes,
          date: post.date,
        }));

        // this.markersService.markers$.next(markersArr);
        return postsArr;
      })
    );

  }

}
