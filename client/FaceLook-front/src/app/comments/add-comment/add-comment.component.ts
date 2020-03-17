import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommentsService } from "../service/comments.service";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  @Input() post: any;
  comment: string;
  commenterId: string;
  commented = false;
  userId: string;

  constructor(private commentsService: CommentsService  ) { }

  ngOnInit(): void {
  }

  addComment(){
    let params = {
      comment: this.comment,
      postId: this.post.post_id,
      commenterId: this.post.publisher_id
    }
    console.log("addComment, params ==> ");
    console.log(params);
    
    this.commented = true;
    this.commentsService.addCommentToPost(params);
  }

}
