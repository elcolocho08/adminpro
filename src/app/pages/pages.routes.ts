import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';

const PagesRoutes: Routes = [
    {
        path: '', component:  PagesComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent},
          { path: 'progress', component: ProgressComponent},
          { path: 'graficas1', component: Grafica1Component},
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
      },
];

@NgModule({
    imports: [RouterModule.forChild( PagesRoutes )],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
