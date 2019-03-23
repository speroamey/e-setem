import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompetencesModalService } from './modal-service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  animations: [routerTransition()]
})
export class CompetencesComponent implements OnInit {
  closeResult: string;
  private competence: any;
  public competences: any[];
  private current: any;
  private modalRef: any;
  private prestations: any[];
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private pieceModalService: CompetencesModalService,
    private toastr: ToastrService
  ) {

    this.competence = {};
  }

  ngOnInit() {
    this.load();
  }

  open(content, pres?) {

    if (pres !== undefined) {
      let tmp = JSON.parse(JSON.stringify(pres))
      this.competence = tmp;
    }else{
      this.competence={};
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
      return `with: ${reason}`;
    }
  }

  private load() {
    this.pieceModalService.load()
      .subscribe(result => {
        // console.log("result");
        if (result) {
          // console.log(result.json());
          let res = result.json();
          this.competences = res;
        }
      },
      
      error=>{
        console.log("something wrong");
      });
  }

  save() {
    if (this.competence.id) {
      //call service
      this.pieceModalService.update(this.competence.id, this.competence)
        .subscribe(result => {
          for (let index = 0; index < this.competences.length; index++) {
            if (this.competence.id==this.competences[index].id) {
              this.competences[index] = this.competence;
              break;
            }
          }
        });
      this.modalRef.dismiss(true);
    } else {
      this.pieceModalService.add(this.competence)
        .subscribe(result => {
          this.competences.push(result.json());
        },
        error=>{
          this.toastr.error('Ce code/libellé existe déja !', 'Impossible d\'ajouter!');
        });
      this.modalRef.dismiss(true);
    }

  }

  remove() {
    // console.log(this.current);
    this.pieceModalService.remove(this.competence.id)
      .subscribe(result => {
        console.log("something ");
        let data = result.json();
        this.competences.forEach((p, i) => {
          if (p.id === this.competence.id) {
            this.competences.splice(i, 1);
          } else {
            console.log("nothing");
          }
        });
      },
      error=>{
        console.log("something wrong");
        this.toastr.error('Erreur objet lié!', 'Suppression impossible!');
      });
    this.modalRef.dismiss(true);
  }
}
