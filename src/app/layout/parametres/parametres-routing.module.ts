import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParametresComponent } from './parametres.component';
import { PiecesAdministrativesComponent } from './pieces-administratives/pieces-administratives.component';

const routes: Routes = [
    { path: '', component:ParametresComponent,
    children: [
      { path: 'pieces-administratives', loadChildren: './pieces-administratives/pieces-administratives.module#PiecesAdministrativesModule' },
      { path: 'branches', loadChildren: './branches/branches.module#BranchesModule' },
      { path: 'fonctions', loadChildren: './fonctions/branches.module#FonctionsModule' },
      { path: 'competences', loadChildren: './competences/competences.module#CompetencesModule' },
      { path: 'antennes-sites', loadChildren: './antennes-sites/antennes-sites.module#AntennesSitesModule' },
      { path: 'departements-services', loadChildren: './departements-services/departements-services.module#DepartementsServicesModule' },
      { path: 'systemes', loadChildren: './systemes/systemes.module#SystemesModule' },

      // { path: 'projets', loadChildren: './projets/projets.module#ProjetsModule' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametresRoutingModule { }
