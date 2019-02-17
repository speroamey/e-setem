import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AptitudesComponent } from './formations.component';


const routes: Routes = [
  
    { path: '', component: AptitudesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormationsRoutingModule { }
