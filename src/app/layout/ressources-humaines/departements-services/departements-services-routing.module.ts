import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartementsServicesComponent } from './departements-services.component';


const routes: Routes = [
  
    { path: '', component: DepartementsServicesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BranchesRoutingModule { }
