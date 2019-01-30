import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ParametresRoutingModule } from './rh-routing.module';
import { ParametresComponent } from './rh.component';
import { HeaderComponent, SidebarComponent } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        NgbDropdownModule.forRoot(),
        ParametresRoutingModule,
        TranslateModule,
        NgbModule
    ],
    declarations: [
        ParametresComponent,
    ]
})
export class RhModule { }
