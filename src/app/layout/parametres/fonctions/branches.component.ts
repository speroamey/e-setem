import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {BranchesModalService} from './modal-service'

@Component({
  selector: 'app-fonctions',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css'],
  animations: [routerTransition()]
})
export class FonctionsComponent implements OnInit {

  closeResult: string;
    private fonction:any;
    public fonctions:any[];
    private current:any;
    private modalRef :any;
    private prestations:any[];
    constructor(private modalService: NgbModal,
                public activeModal: NgbActiveModal,
                 private pieceModalService:BranchesModalService,
                 ) {

        this.fonction={};
    }

    ngOnInit() {
     this.load();
    }

    open(content,pres?) {

      if(pres !== undefined){
        let tmp= JSON.parse(JSON.stringify(pres))
        this.fonction =tmp;
      }
      // console.log(this.fonction)
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
              this.fonctions = res;
            }
            //  return null;
    });
  }

  save(){
   
    
    if (this.fonction.id) {
        //call service
        this.pieceModalService.update(this.fonction.id,this.fonction)
        .subscribe(result => {
          console.log( this.fonctions);
            let index=this.fonctions.findIndex((current)=>{
              return current.id=this.fonction.id;
            })
            this.fonctions[index]=this.fonction
        });
        this.modalRef.dismiss(true);
    } else {
      this.pieceModalService.add(this.fonction)
      .subscribe(result => {
          this.fonctions.push(result.json());
      });
      this.modalRef.dismiss(true);
    }

  }

  remove(){
    // console.log(this.current);
    this.pieceModalService.remove(this.fonction.id)
    .subscribe(result => {
        let data=result.json();
        // console.log('jsut pr tester',data);
        // if (data == 1) {
        //   this.fonctions.splice(this.fonction.id, 1);
        // }
        this.fonctions.forEach((p, i) => {
                if (p.id === this.fonction.id) {
                  this.fonctions.splice(i, 1);
                }else{
                  console.log("nothing");
                }
          });
    });
    this.modalRef.dismiss(true);
  }

}
