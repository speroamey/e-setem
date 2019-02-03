import { Component } from '@angular/core';
import { AppService } from 'app/app.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isActive = false;
    showMenu = '';
    public role;
    username: string;

    constructor( private appService: AppService){

    }
    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
    ngOnInit(){
        this.role=sessionStorage.getItem('roles');
        this.username = sessionStorage.getItem('username');
    }

   get user_role(){
       if(this.role == 'ADMIN'){
        return true;
       }
   }
}
