import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidevarComponent } from './sidevar/sidevar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PagenofoundComponent } from '../pagenofound/pagenofound.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
    HeaderComponent,
    SidevarComponent,
    BreadcrumbsComponent,
    PagenofoundComponent
    ],
    imports: [
        RouterModule,
        CommonModule
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
