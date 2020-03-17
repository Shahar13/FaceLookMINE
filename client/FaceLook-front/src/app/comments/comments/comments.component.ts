import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { CommentsService } from "../service/comments.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() post: any;
  comments: any = [];
  publisherId: string;
  publisherName: string;

  subscriptionGet: Subscription;
  subscriptionPost: Subscription;
  // postIdEmmited: string;

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    // this.subscriptionGet = this.commentsService.getComments(this.post.publisher_id)
    this.subscriptionGet = this.commentsService.getComments()
      .subscribe((res) => {
        console.log("ALL COMMENTS");
        console.log(res);
        
        ///////////////////////////////////////////
        ///////////////////////////////////////////
        ///////////////////////////////////////////
        this.publisherId = this.post.publisher_id;
        this.publisherName = this.post.name;
        ///////////////////////////////////////////
        ///////////////////////////////////////////
        ///////////////////////////////////////////
        
        this.comments = res;
      })
  }


}
