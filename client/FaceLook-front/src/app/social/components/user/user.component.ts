import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from "ngx-toastr";

import { UsersService } from "../../service/users.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  isClicked: boolean = false;

  @Input() user: any;
  
  imgPath: string = 'http://localhost:3000/public/uploads/images/';

  constructor(
    public userService: UsersService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // console.log("user component: single user ==>")
    // console.log(this.user)
  }

  addFriend(friendId: any){
    const friendshipData = {
      friendId: friendId
    }

    this.userService.addFriend(friendshipData).subscribe(
      res => {
        console.log("user comp addFriend: res ==> ");
        console.log(res);
        this.toastr.success("SABABA");

        this.isClicked = false;
      },
      error => {
        this.toastr.error("Error adding a friend");
      }
    );
  }

}
