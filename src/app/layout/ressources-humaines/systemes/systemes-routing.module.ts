import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemesComponent } from './systemes.component';


const routes: Routes = [
  
    { path: '', component: SystemesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemesRoutingModule { }
