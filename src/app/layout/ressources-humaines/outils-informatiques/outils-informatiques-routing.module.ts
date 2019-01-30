import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutilsInformatiquesComponent } from './outils-informatiques.component';


const routes: Routes = [
  
    { path: '', component: OutilsInformatiquesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OutilsInformatiquesRoutingModule { }
