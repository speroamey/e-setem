import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AffiliationsComponent } from './affiliations.component';


const routes: Routes = [
  
    { path: '', component: AffiliationsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AffiliationsRoutingModule { }
