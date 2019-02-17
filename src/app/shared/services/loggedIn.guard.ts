import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './AuthServices';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private authService: AuthService, private router : Router, private toastr: ToastrService) {}
  canActivate(){
    // console.log(this.authService.isLoggedIn())
    // return this.authService.isLoggedIn();
    if (localStorage.getItem('jhi-authenticationtoken')) {
              // logged in so return true
              console.log(this.authService.isLoggedIn);
              
              return true;
        }else{
          this.router.navigate(['/login']);
          console.log("j'entre kmm", this.authService.isLoggedIn);
          
          // this.toastr.error('Echec de la connexion!', 'Erreur');
          return false;
        }

          // not logged in so redirect to login page
        
  }



}
