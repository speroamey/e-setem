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

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        FicheRenseignementsRoutingModule,
        PageHeaderModule,
        FormsModule,
        NgbModule.forRoot()
    ],
    declarations: [FicheRenseignementsComponent],
    providers: [FicheRenseignementsModalService,NgbActiveModal,DatePipe],

})
export class FicheRenseignementsModule { }
