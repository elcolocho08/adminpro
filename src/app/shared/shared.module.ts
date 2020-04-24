import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidevarComponent } from './sidevar/sidevar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PagenofoundComponent } from '../pagenofound/pagenofound.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [
    HeaderComponent,
    SidevarComponent,
    BreadcrumbsComponent,
    PagenofoundComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    exports: [
    HeaderComponent,
    SidevarComponent,
    BreadcrumbsComponent,
    PagenofoundComponent
    ],
    providers: [],
})
export class SharedModule {}
