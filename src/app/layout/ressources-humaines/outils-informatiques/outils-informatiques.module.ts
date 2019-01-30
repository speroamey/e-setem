import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { OutilsInformatiquesRoutingModule } from './outils-informatiques-routing.module';
import { OutilsInformatiquesComponent } from './outils-informatiques.component';
import { PageHeaderModule } from '../../../shared';
import {BranchesModalService} from './modal-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        OutilsInformatiquesRoutingModule,
        PageHeaderModule,
        FormsModule,
        
        NgbModule.forRoot()
    ],
    declarations: [OutilsInformatiquesComponent],
    providers: [BranchesModalService,NgbActiveModal,DatePipe],

})
export class OutilsInformatiquesModule { }
