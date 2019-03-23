import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {UsersModalService} from './modal-service'
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-branches',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [routerTransition()]
})
export class UsersComponent implements OnInit {

  closeResult: string;
    private branche:any;
    public branches:any[];
    private current:any;
    private modalRef :any;
    private prestations:any[];
    private roles:string[];
    private sexes:string[];
    pushRightClass: string = 'push-right';
    context: any;
    modification: boolean=false;
  role: string;

    constructor(private modalService: NgbModal,
                public activeModal: NgbActiveModal,
                 private pieceModalService:UsersModalService,
                 public router: Router,
                 ) {
        this.router.events.subscribe((val) => {
          if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
              this.toggleSidebar();
           }
        });

        this.branche={};
        this.roles=['ADMIN','USER'];
        this.sexes=['Masculin','Féminin'];
    }

    ngOnInit() {
     this.load();
     this.role=sessionStorage.getItem('roles');
    }

    isToggled(): boolean {
      const dom: Element = document.querySelector('body');
      return dom.classList.contains(this.pushRightClass);
   }

    toggleSidebar() {
      const dom: any = document.querySelector('body');
      dom.classList.toggle(this.pushRightClass);
  }

    open(content,pres?,context?) {

      if(pres !== undefined){
        this.modification=true;
        let tmp= JSON.parse(JSON.stringify(pres))
        this.context=context;
        if(context=="chpass"){
          tmp.password=''
          this.branche=tmp
        }
        this.branche =tmp;
      }
      // console.log(this.branche)
      this.modalRef = this.modalService.open(content)
      this.modalRef.result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
          this.branche={};
          this.modification=false;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.branche={};
          this.modification=false;
      });
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  `with: ${reason}`;
      }
  }

  private load(){
    this.pieceModalService.load()
    .subscribe(result => {
            // console.log("result");
            if (result) {
              // console.log(result.json());
              let res = result.json();
              this.branches = res;
            }
            //  return null;
    });
  }

  save(){
   
    
    if (this.branche.id) {
        //call service

        if(this.context=='chpass'){
          this.pieceModalService.updatePass(this.branche.id,this.branche)
          .subscribe(result => {
            console.log( this.branche);
              this.branche=this.branche
          });
        }else{
          this.pieceModalService.update(this.branche.id,this.branche)
          .subscribe(result => {
            console.log( this.branches);
              let index=this.branches.findIndex((current)=>{
                return current.id=this.branche.id;
              })
              this.branches[index]=this.branche
          });
        }

       
        this.modalRef.dismiss(true);
    } else {
      
      this.pieceModalService.add(this.branche)
      .subscribe(result => {
          this.branches.push(result.json());
      });
      this.modalRef.dismiss(true);
    }
    this.modification=false;

  }

  remove(){
    // console.log(this.current);
    this.pieceModalService.remove(this.branche.id)
    .subscribe(result => {
        let data=result.json();
        // console.log('jsut pr tester',data);
        // if (data == 1) {
        //   this.branches.splice(this.branche.id, 1);
        // }
        this.branches.forEach((p, i) => {
                if (p.id === this.branche.id) {
                  this.branches.splice(i, 1);
                }else{
                  console.log("nothing");
                }
          });
    });
    this.modalRef.dismiss(true);
  }

}
