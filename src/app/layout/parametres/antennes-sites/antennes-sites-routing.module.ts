import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AntennesSitesComponent } from './antennes-sites.component';


const routes: Routes = [
  
    { path: '', component: AntennesSitesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PiecesAdministrativesRoutingModule { }
