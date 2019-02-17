import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonnesRessourcesComponent } from './formations.component';


const routes: Routes = [
  
    { path: '', component: PersonnesRessourcesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormationsRoutingModule { }
