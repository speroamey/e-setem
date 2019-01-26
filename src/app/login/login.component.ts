import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {AuthService} from '../shared/services/AuthServices';
import { AppService } from 'app/app.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    username: string;
    password: string;
    private credentials:any;
    message: string;
    private data:any;
    private loading = false;
    constructor(public router: Router, private authService: AuthService, appService: AppService) {
        this.credentials = {};
    }

    ngOnInit() {
         this.authService.logout();
    }

   

    onSignIn() {
      this.message = '';
      this.credentials.username=this.username;
      this.credentials.password=this.password;
      if (this.credentials) {
        this.authService.login(this.credentials)
        .subscribe(result => {
                if (result === true) {
                    this.data=result;
                    this.router.navigate(['/']);
                } else {

                    this.loading = false;
                }
            // ((fiche: any) => {
            //     this.data = fiche;
            // })
        });


      }
    
    }

}
