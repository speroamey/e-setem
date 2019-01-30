import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-parametres',
    templateUrl: './parametres.component.html',
   
})
export class ParametresComponent implements OnInit {
    username: string;
    password: string;
    private credentials:any;
    message: string;
    private data:any;
    private loading = false;
    constructor(public router: Router) {
        this.credentials = {};
    }

    ngOnInit() {
         console.log("toto:");
         
    }

   

}
