import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})

export class CommentsService {

  url = "http://localhost:3000/comments/";

  // public comments: any = {};
  publisherId: string;

  constructor(
    private httpClient: HttpClient
  ) { }

  getComments() {
    // const params = new HttpParams().set('params', _publisherId);
    // return this.httpClient.get(this.url + "getComments", {params});
    // return this.httpClient.get(this.url + "getComments/" + _publisherId);
    return this.httpClient.get(this.url + "getComments");
  }

  addCommentToPost(params: any) {
    this.httpClient.post(this.url + "addComment", params).subscribe();
  }
}
