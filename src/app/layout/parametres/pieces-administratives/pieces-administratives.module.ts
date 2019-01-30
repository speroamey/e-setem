import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { PiecesAdministrativesRoutingModule } from './pieces-administratives-routing.module';
import { PiecesAdministrativesComponent } from './pieces-administratives.component';
import { PageHeaderModule } from '../../../shared';
import {PiecesAdministrativesModalService} from './modal-service';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        PiecesAdministrativesRoutingModule,
        PageHeaderModule,
        FormsModule,
        NgbModule.forRoot()
    ],
    declarations: [PiecesAdministrativesComponent],
    providers: [PiecesAdministrativesModalService,NgbActiveModal,DatePipe],

})
export class PiecesAdministrativesModule { }
