import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Post } from "../posts/posts.model";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private http: HttpClient, private router: Router) {}

  private posts: Post[] = [];
  private postUpdate = new Subject<Post[]>();

  // Get Posts from Node/DB ////////

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>("http://localhost:3000/api/posts")
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postUpdate.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postUpdate.asObservable();
  }

  // Use for edit our posts - post-create NgOnInit + showing the post after page update
  //we will subscribe to this in the post-create.componenet.ts ///////////

  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string }>(
      "http://localhost:3000/api/posts/" + id
    );
  }

  // Add new post using Node to DB ////////

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string; postId: string }>(
        "http://localhost:3000/api/posts",
        post
      )
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postUpdate.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  // Update the posts after EDIT ///////

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.http
      .put("http://localhost:3000/api/posts/" + id, post)
      .subscribe(res => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postUpdate.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  // Delete Posts using node from DB //////////////

  deletePost(postId: string) {
    this.http
      .delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatePosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatePosts;
        this.postUpdate.next([...this.posts]);
      });
  }
}
