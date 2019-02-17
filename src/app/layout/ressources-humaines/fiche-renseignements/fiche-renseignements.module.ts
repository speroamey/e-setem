import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { FicheRenseignementsRoutingModule } from './fiche-renseignements-routing.module';
import {FicheRenseignementsComponent } from './fiche-renseignements.component';
import { PageHeaderModule } from '../../../shared';
import {FicheRenseignementsModalService} from './modal-service';
import {IdentitesComponent} from '../identites/formations.component'
import {IdentitesModalService} from '../identites/modal-service'
import {BranchesModalService} from '../affiliations/modal-service'
import {AffiliationsComponent} from '../affiliations/affiliations.component'
import {ExperiencesComponent} from '../experiences-professionnelles/formations.component'
import {ExperiencessModalService} from '../experiences-professionnelles/modal-service'
import {FormationsComponent} from '../formations/formations.component'
import {FormationsModalService} from '../formations/modal-service'
import {OutilsInformatiquesComponent} from '../outils-informatiques/outils-informatiques.component'
import {OutilsInformatiqueModalService} from '../outils-informatiques/modal-service'
import {PersonnesRessourcesComponent} from '../personnes-ressources/formations.component'
import {PersonnesRessourcesModalService} from '../personnes-ressources/modal-service'
import {IdentitesModule} from '../identites/formations.module'
import {OutilsInformatiquesModule} from '../outils-informatiques/outils-informatiques.module'
import {ExperiencesProfessionnellesModule} from '../experiences-professionnelles/formations.module'
import {FormationsModule} from '../formations/formations.module'
import {PersonnesRessourcesModule} from '../personnes-ressources/formations.module'
import {AffiliationsModule} from '../affiliations/affiliations.module'


@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        FicheRenseignementsRoutingModule,
        PageHeaderModule,
        FormsModule,
        NgbModule.forRoot(),
        ExperiencesProfessionnellesModule,
        IdentitesModule,
        OutilsInformatiquesModule,
        PersonnesRessourcesModule,
        FormationsModule,
        AffiliationsModule
    ],
    declarations: [
        FicheRenseignementsComponent,
        
    ],

    providers: [FicheRenseignementsModalService,
        IdentitesModalService,
        BranchesModalService,
        ExperiencessModalService,
        FormationsModalService,
        OutilsInformatiqueModalService,
        PersonnesRessourcesModalService,
        NgbActiveModal,DatePipe
    ],

})
export class FicheRenseignementsModule { }
