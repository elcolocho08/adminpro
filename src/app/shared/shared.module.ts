import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidevarComponent } from './sidevar/sidevar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { PagenofoundComponent } from '../shared/pagenofound/pagenofound.component';
import { ModalComponent } from '../components/modal/modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
    HeaderComponent,
    SidevarComponent,
    BreadcrumbsComponent,
    PagenofoundComponent,
    ModalComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        PipesModule,
        FormsModule
    ],
    exports: [
    HeaderComponent,
    SidevarComponent,
    BreadcrumbsComponent,
    PagenofoundComponent,
    ModalComponent
    ],
    providers: [],
})
export class SharedModule {}
