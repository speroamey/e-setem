import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentitesComponent } from './formations.component';


const routes: Routes = [
  
    { path: '', component: IdentitesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormationsRoutingModule { }
