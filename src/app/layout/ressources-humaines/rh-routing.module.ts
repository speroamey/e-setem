import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParametresComponent } from './rh.component';
import { PiecesAdministrativesComponent } from './personnels-consultants/pieces-administratives.component';

const routes: Routes = [
    { path: '', component:ParametresComponent,
    children: [
      { path: 'personnels-consultants', loadChildren: './personnels-consultants/pieces-administratives.module#PiecesAdministrativesModule' },
      { path: 'documents-consultants', loadChildren: './documents-consultants/branches.module#BranchesModule' },
      { path: 'fiche-renseignements', loadChildren: './fiche-renseignements/fiche-renseignements.module#FicheRenseignementsModule' },
      { path: 'affiliations', loadChildren: './affiliations/affiliations.module#AffiliationsModule' },
      { path: 'outils-informatiques', loadChildren: './outils-informatiques/outils-informatiques.module#OutilsInformatiquesModule' },
      { path: 'formations', loadChildren: './formations/formations.module#FormationsModule' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametresRoutingModule { }
