import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FicheRenseignementsComponent } from './fiche-renseignements.component';


const routes: Routes = [
  
    { path: ':id', component: FicheRenseignementsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FicheRenseignementsRoutingModule { }
