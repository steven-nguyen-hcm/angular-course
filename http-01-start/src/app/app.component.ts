import { Component, OnInit } from "@angular/core";
import { finalize } from "rxjs/operators";
import { Post } from "./post.model";
import { PostService } from "./post.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  isFetching: boolean = true;

  error: any;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.isFetching = true;
    this.postService
      .createPost(postData)
      .pipe(finalize(this.onFinishCallback.bind(this)))
      .subscribe(
        (responseData) => {
          console.log(responseData);
          this.fetchPosts();
        },
        (err) => console.log(err)
      );
  }

  onFetchPosts(): void {
    this.fetchPosts();
  }

  onClearPosts(): void {
    this.postService.deletePosts().subscribe(
      () => this.fetchPosts(),
      (err) => console.error(err),
      this.onFinishCallback.bind(this)
    );
  }

  private fetchPosts(): void {
    this.isFetching = true;
    this.postService
      .fetchPosts()
      .pipe(finalize(this.onFinishCallback.bind(this)))
      .subscribe(
        (postsArray: Post[]) => {
          this.loadedPosts = postsArray;
        },
        this.onErrorCallback.bind(this)
      );
  }

  private onFinishCallback() {
    this.isFetching = false;
  }

  private onErrorCallback(error) {
    console.log(error);
    this.error = error;
  }
}
