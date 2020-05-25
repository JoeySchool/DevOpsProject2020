import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';



import { ExcelComponent } from './examples/excel/excel.component';

const routes: Routes =[
    { path: '', redirectTo: 'case', pathMatch: 'full' },
    { path: 'case',             component: ExcelComponent},
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
