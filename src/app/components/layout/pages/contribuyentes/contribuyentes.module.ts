import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContribuyentesComponent } from './contribuyentes.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../../../shared/shared.module';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);

// const routes: Routes = [
//   { path: '', component: ContribuyentesComponent },
// ];

@NgModule({
  declarations: [ContribuyentesComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    // RouterModule.forChild(routes),
    FormsModule,
    BrowserModule,
    SharedModule,
  ],
  exports: [
    // RouterModule,
    ContribuyentesComponent
  ]
})
export class ContribuyentesModule { }
