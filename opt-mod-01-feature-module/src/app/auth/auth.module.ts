import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

@NgModule({
  imports: [
    RouterModule.forChild([{ path: "", component: AuthComponent }]),
    FormsModule,
    SharedModule,
  ],
  declarations: [AuthComponent],
})
export class AuthModule {}
