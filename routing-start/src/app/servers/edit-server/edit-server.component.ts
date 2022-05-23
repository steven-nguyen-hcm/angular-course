import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Server } from "../server/server.interface";

import { ServersService } from "../servers.service";
import { ICanDeactivateComponent } from "./can-deactivate-guard.service";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"],
})
export class EditServerComponent implements OnInit, ICanDeactivateComponent {
  server: { id: number; name: string; status: string };
  serverName = "";
  serverStatus = "";
  allowEdit: boolean = false;
  updateSaved: boolean = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.toPromise().then((queryParams: any) => {
      console.log(queryParams);
      this.allowEdit = queryParams?.allowEdit === "1";
    });
    this.route.fragment.subscribe((fragment: string) => {
      console.log(fragment);
    });

    this.serversService
      .getServer(+this.route.snapshot.params["id"])
      .then((server: Server) => (this.server = server));
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.updateSaved = true;
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
    if (!this.allowEdit) return true;
    if (
      this.server.name != this.serverName ||
      this.server.status != this.serverStatus ||
      !this.updateSaved
    ) {
      return confirm("Do you want to discard the changes?");
    } else {
      return true;
    }
  }
}
