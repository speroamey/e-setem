import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompetencesComponent } from './competences.component';


const routes: Routes = [
  
    { path: '', component: CompetencesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BranchesRoutingModule { }
