import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { BranchesRoutingModule } from './competences-routing.module';
import {CompetencesComponent } from './competences.component';
import { PageHeaderModule } from '../../../shared';
import {CompetencesModalService} from './modal-service';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        BranchesRoutingModule,
        PageHeaderModule,
        FormsModule,
        NgbModule.forRoot()
    ],
    declarations: [CompetencesComponent],
    providers: [CompetencesModalService,NgbActiveModal,DatePipe],

})
export class CompetencesModule { }
