import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentsService } from 'src/app/comments/service/comments.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: any;
  @Output() likesEmitter = new EventEmitter<string>();

  imgPath: string = 'http://localhost:3000/public/uploads/images/';

  likeClicked: boolean = false;

  subscriptionGet: Subscription;
  postComments: any = [];
  
  constructor(
    private commentsService: CommentsService
  ) { }

  ngOnInit(): void {
    // console.log("post comp ==> ");
    // console.log(this.post);
  }

  addLike(post: any){
    if(this.likeClicked == false){
      // update the likes
      this.post.likes++;
      // include the new value of likes
      this.likesEmitter.emit(post);
      this.likeClicked = true;
    } 
  }

  getCommentsOfPost(postId){
    this.subscriptionGet = this.commentsService.getComments(postId)
    .subscribe((res) => {
      this.postComments = res;
    })
  }
  
}
