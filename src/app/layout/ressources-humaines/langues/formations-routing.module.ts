import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanguesComponent } from './formations.component';


const routes: Routes = [
  
    { path: '', component: LanguesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormationsRoutingModule { }
