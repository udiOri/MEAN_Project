import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "../posts/posts.model";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor() {}

  private posts: Post[] = [];
  private postUpdate = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postUpdate.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { title: title, content: content };
    this.posts.push(post);
    this.postUpdate.next([...this.posts]);
  }
}
