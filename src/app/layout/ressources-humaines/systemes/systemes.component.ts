import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {SystemesModalService} from './modal-service'

@Component({
  selector: 'app-systemes',
  templateUrl: './systemes.component.html',
  animations: [routerTransition()]
})
export class SystemesComponent implements OnInit {

  closeResult: string;
    private systeme:any;
    private systemes:any[];
    private current:any;
    private modalRef :any;
    private prestations:any[];
    constructor(private modalService: NgbModal,
                public activeModal: NgbActiveModal,
                 private pieceModalService:SystemesModalService,
                 ) {

        this.systeme={};
    }

    ngOnInit() {
     this.load();
    }

    open(content,pres?) {

      if(pres !== undefined){
        let tmp= JSON.parse(JSON.stringify(pres))
        this.systeme =tmp;
      }
       console.log(this.systeme)
      this.modalRef = this.modalService.open(content)
      this.modalRef.result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
              this.systemes = res;
            }
            //  return null;
    });
  }

  save(){
    console.log( this.systeme);
    
    if (this.systeme.id) {
        //call service
        this.pieceModalService.update(this.systeme.id,this.systeme)
        .subscribe(result => {
         
            let index=this.systemes.findIndex((current)=>{
              return current.id=this.systeme.id;
            })
            this.systemes[index]=this.systeme
        });
        this.modalRef.dismiss(true);
    } else {
      this.pieceModalService.add(this.systeme)
      .subscribe(result => {
          this.systemes.push(result.json());
      });
      this.modalRef.dismiss(true);
    }

  }

  remove(){
    // console.log(this.current);
    this.pieceModalService.remove(this.systeme.id)
    .subscribe(result => {
        let data=result.json();
        // console.log('jsut pr tester',data);
        // if (data == 1) {
        //   this.systemes.splice(this.systeme.id, 1);
        // }
        this.systemes.forEach((p, i) => {
                if (p.id === this.systeme.id) {
                  this.systemes.splice(i, 1);
                }else{
                  console.log("nothing");
                }
          });
    });
    this.modalRef.dismiss(true);
  }

}
