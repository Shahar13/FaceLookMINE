import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})

export class FriendsService {

    url = "http://localhost:3000/friends/";
    // public allFriends: any = {};

  constructor(
    private httpClient: HttpClient
  ) {}

  getAllfriends(){
    return this.httpClient.get(this.url + "getFriends");
  }
}
