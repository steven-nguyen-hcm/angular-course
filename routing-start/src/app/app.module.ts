import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./auth-guard.service";
import { AuthService } from "./auth.service";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { ServersService } from "./servers/servers.service";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UsersComponent,
    UserComponent,
    EditServerComponent,
    ServersComponent,
    ServerComponent,
    PageNotFoundComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [ServersService, AuthGuard, AuthService, CanDeactivateGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
