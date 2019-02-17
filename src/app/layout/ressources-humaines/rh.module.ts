import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ParametresRoutingModule } from './rh-routing.module';
import { ParametresComponent } from './rh.component';
import { HeaderComponent, SidebarComponent } from '../../shared';
import { FormsModule } from '@angular/forms';

import { AffiliationsComponent} from './affiliations/affiliations.component'
import {PersonnesRessourcesModule} from './personnes-ressources/formations.module'
import {OutilsInformatiquesModule} from './outils-informatiques/outils-informatiques.module'
import {LanguesModule} from './langues/formations.module'
import {FormationsModule} from './formations/formations.module'
import {ExperiencesProfessionnellesModule} from './experiences-professionnelles/formations.module'
import {IdentitesModule} from './identites/formations.module'



@NgModule({
    imports: [
        CommonModule,
        NgbDropdownModule.forRoot(),
        ParametresRoutingModule,
        TranslateModule,
        FormsModule,
        NgbModule,
        IdentitesModule,
        PersonnesRessourcesModule,
        OutilsInformatiquesModule,
        LanguesModule,
        ExperiencesProfessionnellesModule,
        FormationsModule
        
    ],
    declarations: [
        ParametresComponent,
        
    ]
})
export class RhModule { }
