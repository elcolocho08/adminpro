import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings.component';
import { LoginGGuard } from '../services/service.index';

const PagesRoutes: Routes = [
    {
        path: '', component:  PagesComponent,
        canActivate: [ LoginGGuard ],
        children: [
          { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Barra de progreso' } },
          { path: 'graficas1', component: Grafica1Component, data: { titulo: 'Graficas de dona' } },
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del tema' }},
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
      },
];

@NgModule({
    imports: [RouterModule.forChild( PagesRoutes )],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
