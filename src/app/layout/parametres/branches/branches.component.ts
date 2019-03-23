import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {BranchesModalService} from './modal-service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css'],
  animations: [routerTransition()]
})
export class BranchesComponent implements OnInit {

  closeResult: string;
    private branche:any;
    public branches:any[];
    public competences: any[];
    private current:any;
    private modalRef :any;
    private prestations:any[];
    constructor(private modalService: NgbModal,
                public activeModal: NgbActiveModal,
                 private pieceModalService:BranchesModalService,
                 private toastr: ToastrService
              ) {

        this.branche={};
    }

    ngOnInit() {
     this.load();
     this.loadCompetence();
    }

    open(content,pres?) {
      if(pres !== undefined){
        let tmp= JSON.parse(JSON.stringify(pres))
        this.branche =tmp;
      }else{
        this.branche={};
      }
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
            if (result) {
              let res = result.json();
              this.branches = res;
            }
    });
  }



  private loadCompetence(){
    this.pieceModalService.loadCompetence()
    .subscribe(result => {
            if (result) {
              let res = result.json();
              this.competences = res;
            }
    });
  }

  save(){
    if (this.branche.id) {
        this.pieceModalService.update(this.branche.id,this.branche)
        .subscribe(result => {
            for (let index = 0; index < this.branches.length; index++) {
              if (this.branche.id==this.branches[index].id) {
                this.branches[index] = this.branche;
                break;
              }
            }
        });
        this.modalRef.dismiss(true);
    } else {
      this.pieceModalService.add(this.branche)
      .subscribe(result => {
          this.branches.push(result.json());
      },
      error=>{
        this.toastr.error('Ce code/libellé existe déja !', 'Impossible d\'ajouter!');
      });
      this.modalRef.dismiss(true);
    }

  }

  remove(){
    this.pieceModalService.remove(this.branche.id)
    .subscribe(result => {
        let data=result.json();
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
