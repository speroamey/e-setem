import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartementsServicesModalService } from './modal-service'

@Component({
  selector: 'app-departements-services',
  templateUrl: './departements-services.component.html',
  styleUrls: ['./departements-services.component.css'],
  animations: [routerTransition()]
})
export class DepartementsServicesComponent implements OnInit {

  closeResult: string;
  private departement: any;
  public departements: any[];
  private current: any;
  private modalRef: any;
  private prestations: any[];
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private pieceModalService: DepartementsServicesModalService,
  ) {

    this.departement = {};
  }

  ngOnInit() {
    this.load();
  }

  open(content, pres?) {

    if (pres !== undefined) {
      let tmp = JSON.parse(JSON.stringify(pres))
      this.departement = tmp;
    }
    // console.log(this.departement)
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
          this.departements = res;
        }
        //  return null;
      });
  }

  save() {


    if (this.departement.id) {
      //call service
      this.pieceModalService.update(this.departement.id, this.departement)
        .subscribe(result => {
          console.log(this.departements);
          let index = this.departements.findIndex((current) => {
            return current.id = this.departement.id;
          })
          this.departements[index] = this.departement
        });
      this.modalRef.dismiss(true);
    } else {
      this.pieceModalService.add(this.departement)
        .subscribe(result => {
          this.departements.push(result.json());
        });
      this.modalRef.dismiss(true);
    }

  }

  remove() {
    // console.log(this.current);
    this.pieceModalService.remove(this.departement.id)
      .subscribe(result => {
        let data = result.json();
        // console.log('jsut pr tester',data);
        // if (data == 1) {
        //   this.departements.splice(this.departement.id, 1);
        // }
        this.departements.forEach((p, i) => {
          if (p.id === this.departement.id) {
            this.departements.splice(i, 1);
          } else {
            console.log("nothing");
          }
        });
      });
    this.modalRef.dismiss(true);
  }

}
