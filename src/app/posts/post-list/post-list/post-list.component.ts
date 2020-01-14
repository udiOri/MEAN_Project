import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Post } from "../../posts.model";
import { PostsService } from "../../posts.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(private postService: PostsService) {}

  posts: Post[] = [];
  private postSub: Subscription;

  ngOnInit() {
    this.posts = this.postService.getPosts();
    this.postSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
