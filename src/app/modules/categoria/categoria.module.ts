import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import { RicercaViewComponent } from './pages/ricerca-view/ricerca-view.component';
import { FiltriRicercaComponent } from '@shared/filtri-ricerca/filtri-ricerca.component';


@NgModule({
  declarations: [
    MainViewComponent,
    RicercaViewComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    LayoutModule,
    FiltriRicercaComponent
  ]
})
export class CategoriaModule { }
