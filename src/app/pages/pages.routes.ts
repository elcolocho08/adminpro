import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { ProfileComponent } from './profile/profile.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { AdminGuard } from '../services/guards/admin.guard';
import { AccountSettingsComponent } from './account-settings.component';
import { LoginGGuard } from '../services/guards/login-g.guard';
import { Grafica1Component } from './grafica1/grafica1.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';

const PagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, canActivate: [ VerificaTokenGuard ], data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBars' } },
            { path: 'graficas1', component: Grafica1Component, data: { titulo: 'Gráficas' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Tema' } },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
            { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
            // Mantenimientos
            {
                path: 'usuarios',
                component: UsuariosComponent,
                canActivate: [ AdminGuard ],
                data: { titulo: 'Mantenimiento de Usuarios' }
            },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' } },
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Médico' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
    ];

@NgModule({
    imports: [RouterModule.forChild( PagesRoutes )],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
