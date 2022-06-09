import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private apiEndpoint: string =
    "https://ng-complete-course-177-default-rtdb.asia-southeast1.firebasedatabase.app/";

  constructor(private http: HttpClient) {}

  public createPost(postData: Post) {
    return this.http.post<{ name: string }>(
      this.getRequestUrl("posts.json"),
      postData
    );
  }

  public fetchPosts(): Observable<Post[]> {
    return this.http
      .get<{ [key: string]: Post }>(this.getRequestUrl("posts.json"))
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      );
  }

  public deletePosts(): Observable<any> {
    return this.http.delete(this.getRequestUrl("posts.json"));
  }

  private getRequestUrl(path: string): string {
    return this.apiEndpoint + path;
  }
}
