import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { FormationsRoutingModule } from './formations-routing.module';
import { FormationsComponent } from './formations.component';
import { PageHeaderModule } from '../../../shared';
import {FormationsModalService} from './modal-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        FormationsRoutingModule,
        PageHeaderModule,
        FormsModule,
        
        NgbModule.forRoot()
    ],
    declarations: [FormationsComponent],
    providers: [FormationsModalService,NgbActiveModal,DatePipe],

})
export class FormationsModule { }
