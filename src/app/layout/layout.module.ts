import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent, SidebarComponent } from '../shared';
import { AffiliationsComponent} from './ressources-humaines/affiliations/affiliations.component'
import {PersonnesRessourcesComponent} from './ressources-humaines/personnes-ressources/formations.component'
import {OutilsInformatiquesComponent} from './ressources-humaines/outils-informatiques/outils-informatiques.component'
import {LanguesComponent} from './ressources-humaines/langues/formations.component'
import {IdentitesComponent} from './ressources-humaines/identites/formations.component'
import {FormationsComponent} from './ressources-humaines/formations/formations.component'
import {ExperiencesComponent} from './ressources-humaines/experiences-professionnelles/formations.component'


@NgModule({
    imports: [
        CommonModule,
        NgbDropdownModule.forRoot(),
        LayoutRoutingModule,
        TranslateModule,
        NgbModule,
        FormsModule
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SidebarComponent
    ]
})
export class LayoutModule { }
