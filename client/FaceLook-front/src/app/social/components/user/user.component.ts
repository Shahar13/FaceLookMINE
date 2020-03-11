import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  @Input() user: any;

  constructor() { }

  ngOnInit(): void {
    console.log("user " + this.user)
  }

}