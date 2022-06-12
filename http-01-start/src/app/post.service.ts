import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private apiEndpoint: string =
    "https://ng-complete-course-177-default-rtdb.asia-southeast1.firebasedatabase.app/";
    public $error: Subject<HttpErrorResponse> = new Subject();

  constructor(private http: HttpClient) {}

  public createPost(postData: Post) {
    return this.http.post<{ name: string }>(
      this.getRequestUrl("posts.json"),
      postData,
      {
        observe: 'body'
      }
    ).subscribe(response => {
      console.log(response);
    }, err => {
      this.$error.next(err);
    });
  }

  public fetchPosts(): Observable<Post[]> {
    let searchParams = new HttpParams({
      fromObject: {
        name: 'steven',
        age: '13'
      }
    })
    searchParams = searchParams.append("name", "Steven 2");
    searchParams = searchParams.set("email", "steven@gmail.com");
    return this.http
      .get<{ [key: string]: Post }>(this.getRequestUrl("posts.json"), {
        headers: new HttpHeaders({
          "Custom-Header": "Hello Backend!!",
        }),
        params: searchParams,
      })
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  public deletePosts(): Observable<any> {
    return this.http.delete(this.getRequestUrl("posts.json"), {
      observe: 'body',
    }).pipe(tap(event => {
      console.log(event);
    }));
  }

  private getRequestUrl(path: string): string {
    return this.apiEndpoint + path;
  }
}
