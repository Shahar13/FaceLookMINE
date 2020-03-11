import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})

export class UsersService {

    url = "http://localhost:3000/users/";
    // public allUsers: any = {};

  constructor(
    private httpClient: HttpClient
  ) {}

  getAllUsers(){
    return this.httpClient.get(this.url + "getUsers");
  }
}
