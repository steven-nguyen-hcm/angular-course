import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";
import { Server } from "./server.interface";

@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Server | Observable<Server> | Promise<Server> {
    console.log("Loading Server");

    return this.serversService
      .getServer(+route.params["id"])
      .then((server: Server) => {
        console.log("Loading Completed!");
        return server;
      });
  }
}
