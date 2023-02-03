import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard.routes';
import { AuthGuard } from '../services/auth.guard';
import { DashboardComponent } from './dashboard.component';


const rutasHijas: Routes = [
  { path: '', component: DashboardComponent, children: dashboardRoutes, canActivate: [AuthGuard] },
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rutasHijas)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
