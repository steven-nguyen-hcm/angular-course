import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { TodayComponent } from "./today/today.component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'today',
    loadComponent: () => import('./today/today.component').then(mod => mod.TodayComponent)
  }
]