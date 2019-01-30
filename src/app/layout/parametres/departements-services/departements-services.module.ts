import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { BranchesRoutingModule } from './departements-services-routing.module';
import { DepartementsServicesComponent } from './departements-services.component';
import { PageHeaderModule } from '../../../shared';
import {DepartementsServicesModalService} from './modal-service';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        BranchesRoutingModule,
        PageHeaderModule,
        FormsModule,
        NgbModule.forRoot()
    ],
    declarations: [DepartementsServicesComponent],
    providers: [DepartementsServicesModalService,NgbActiveModal,DatePipe],

})
export class DepartementsServicesModule { }
