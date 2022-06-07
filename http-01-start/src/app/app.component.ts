import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  apiEndpoint: string =
    "https://ng-complete-course-177-default-rtdb.asia-southeast1.firebasedatabase.app/";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    console.log("asdada");

    // Send Http request
    this.http.post(this.getRequestUrl("posts.json"), postData).subscribe(
      (responseData) => {
        console.log(responseData);
      },
      (err) => console.log(err)
    );
    console.log(postData);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(): void {
    this.http
      .get(this.getRequestUrl("posts.json"))
      .pipe(
        map((responseData) => {
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  private getRequestUrl(path: string): string {
    return this.apiEndpoint + path;
  }
}
