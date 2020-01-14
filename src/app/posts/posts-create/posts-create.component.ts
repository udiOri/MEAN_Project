import { Component, OnInit } from "@angular/core";

import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./posts-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  constructor(private postService: PostsService) {}

  ngOnInit() {}

  enteredTitle: "";
  enteredContent: "";

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
