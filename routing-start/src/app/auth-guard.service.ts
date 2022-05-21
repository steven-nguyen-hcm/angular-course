import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.isAuthenticated().then((isLogin: boolean) => {
      if (isLogin) {
        return true;
      } else {
        this.router.navigate(['/']);
      }
    }); 
  }

  canActivateChild(): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }


}