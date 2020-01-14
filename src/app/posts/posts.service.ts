import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Subject } from "rxjs";

import { Post } from "../posts/posts.model";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private http: HttpClient) {}

  private posts: Post[] = [];
  private postUpdate = new Subject<Post[]>();

  getPosts() {
    this.http
      .get<{ message: string; posts: Post[] }>(
        "http://localhost:3000/api/posts"
      )
      .subscribe(postData => {
        this.posts = postData.posts;
        this.postUpdate.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postUpdate.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { title: title, content: content };
    this.http
      .post<{ message: string }>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postUpdate.next([...this.posts]);
      });
  }
}
