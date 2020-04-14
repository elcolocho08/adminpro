import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages.routes';

@NgModule({
    declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    ],
    imports: [
        SharedModule,
        PagesRoutingModule
    ],
    exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
    ],
    providers: [],
})
export class PagesModule { }
