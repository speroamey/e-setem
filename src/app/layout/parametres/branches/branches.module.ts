import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { BranchesRoutingModule } from './branches-routing.module';
import { BranchesComponent } from './branches.component';
import { PageHeaderModule } from '../../../shared';
import {BranchesModalService} from './modal-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        BranchesRoutingModule,
        PageHeaderModule,
        FormsModule,
       
        NgbModule.forRoot()
    ],
    declarations: [BranchesComponent],
    providers: [BranchesModalService,NgbActiveModal,DatePipe],

})
export class BranchesModule { }
