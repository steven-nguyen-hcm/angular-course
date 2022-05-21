import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export interface ICanDeactivateComponent {
  canDeactivate: () => boolean | Promise<boolean> | Observable<boolean>;
}

export class CanDeactivateGuard implements CanDeactivate<ICanDeactivateComponent> {
  canDeactivate(component: ICanDeactivateComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log(currentState);
    
    return component.canDeactivate();
  }
}