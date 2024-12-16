import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeViewComponent } from './components/home-view/home-view.component';

import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LoadingDirective } from '@shared/loading-spinner/directives/loading.directive';
import { MatDialogModule } from '@angular/material/dialog';


export const routes = [
  { path: '', component: HomeViewComponent }
];

@NgModule({
  declarations: [HomeViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    LoadingDirective
  ]
})
export class HomeModule { }
