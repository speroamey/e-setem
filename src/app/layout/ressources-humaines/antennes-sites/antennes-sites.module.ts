import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { PiecesAdministrativesRoutingModule } from './antennes-sites-routing.module';
import { AntennesSitesComponent } from './antennes-sites.component';
import { PageHeaderModule } from '../../../shared';
import {AntennesSitesModalService} from './modal-service';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        PiecesAdministrativesRoutingModule,
        PageHeaderModule,
        FormsModule,
        NgbModule.forRoot()
    ],
    declarations: [AntennesSitesComponent],
    providers: [AntennesSitesModalService,NgbActiveModal,DatePipe],

})
export class AntennesSitesModule { }
