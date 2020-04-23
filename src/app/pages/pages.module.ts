import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages.routes';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingsComponent
    ],
    imports: [
        SharedModule,
        PagesRoutingModule,
        ChartsModule,
        FormsModule
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
