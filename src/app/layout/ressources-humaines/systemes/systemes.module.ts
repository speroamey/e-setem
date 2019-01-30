import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { SystemesRoutingModule } from './systemes-routing.module';
import { SystemesComponent } from './systemes.component';
import { PageHeaderModule } from '../../../shared';
import {SystemesModalService} from './modal-service';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        SystemesRoutingModule,
        PageHeaderModule,
        FormsModule,
        NgbModule.forRoot()
    ],
    declarations: [SystemesComponent],
    providers: [SystemesModalService,NgbActiveModal,DatePipe],

})
export class SystemesModule { }
