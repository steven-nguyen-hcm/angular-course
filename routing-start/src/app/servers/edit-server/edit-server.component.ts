import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ServersService } from "../servers.service";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"],
})
export class EditServerComponent implements OnInit {
  server: { id: number; name: string; status: string };
  serverName = "";
  serverStatus = "";
  allowEdit: boolean = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      console.log(queryParams);
      this.allowEdit = queryParams?.allowEdit === "1";
    })
    this.route.fragment.subscribe((fragment: string) => {
      console.log(fragment);
    })
  
    
    this.server = this.serversService.getServer(
      +this.route.snapshot.params["id"]
    );
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
  }
}
