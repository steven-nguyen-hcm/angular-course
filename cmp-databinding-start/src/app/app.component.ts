import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  serverElements = [];
  newServerName = "";
  newServerContent = "";

  gameControlNumbers: Number[] = [];

  onServerCreated(newServer: { serverName: string; serverContent: string }) {
    this.serverElements.push({ ...newServer, type: "server" });
  }

  onBlueprintCreated(newServer: { serverName: string; serverContent: string }) {
    this.serverElements.push({ ...newServer, type: "blueprint" });
  }

  onNewNumberEmitted(number: Number) {
    this.gameControlNumbers.push(number);
  }
}