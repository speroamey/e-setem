import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {PiecesAdministrativesModalService} from './modal-service'
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-pieces',
    templateUrl: './pieces-administratives.component.html',
    styleUrls: ['./pieces-administratives.component.css'],
    animations: [routerTransition()]
})
export class PiecesAdministrativesComponent implements OnInit {
    closeResult: string;
    private piece:any;
    private libelle_piece:string;
    private date_livraison:any;
    private delais_garantie:string;
    private date_fin_garantie : any;
    public pieces:any[];
    private current:any;
    private modalRef :any;
    private prestations:any[];
     uploadData;
    constructor(private modalService: NgbModal,
                public activeModal: NgbActiveModal,
                 private pieceModalService:PiecesAdministrativesModalService,
                 private toastr: ToastrService
                 ) {

        this.piece={};
    }

    ngOnInit() {
     this.load();
    }

    open(content,pres?) {
      if(pres !== undefined){
        let tmp= JSON.parse(JSON.stringify(pres))
        let obj=new Date(tmp.expiration_date);
        let day = obj.getDate();
        let month = obj.getMonth()+1;
        let year = obj.getFullYear();
        tmp.expiration_date={
          day:day,
          month:month,
          year:year
        }
        this.piece =tmp;
      }else{
        this.piece={};
      }
      // console.log(this.piece)
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
    this.pieceModalService.load(sessionStorage.getItem('user_id'))
    .subscribe(result => {
            console.log("result");
            if (result) {
              console.log(result.json());
              let res = result.json();
              this.pieces = res;
            }
            //  return null;
    });
  }

  fileChange(event) {
        let file: File = event.target.files[0];
        console.log(file);
        this.uploadData = new FormData();
        this.uploadData.append('myFile', file, file.name);
        // this.piece.file=file;
        this.pieceModalService.add(this.uploadData)
          .subscribe(result => {
              // this.pieces.push(result.json());
              console.log(result.json());
              this.piece.file = result.json();
          },
          error=>{
            this.toastr.error('Cette image ne peut etre enregistrer !', 'Erreur!');
          });
  }
  
  save(){
    let day = this.piece.expiration_date.day;
    let month = this.piece.expiration_date.month-1;
    let year = this.piece.expiration_date.year;
    this.piece.expiration_date = new Date(year,month,day);
    this.piece.user_id = sessionStorage.getItem('user_id');


    if (this.piece.id) {
        //call service
        this.pieceModalService.update(this.piece.id,this.piece)
          .subscribe(result => {
              // this.pieces.push(result);
              let index=this.pieces.findIndex((current)=>{
                return current.id=this.piece.id;
              })
              this.pieces[index]=this.piece
          });
          this.modalRef.dismiss(true);
    } else {
      this.pieceModalService.add(this.piece)
        .subscribe(result => {
          console.log("cool", result.json());
          this.pieces.push(result.json());
        },
        error=>{
          this.toastr.error('Ce code/libellé existe déja !', 'Impossible d\'ajouter!');
        });
        this.modalRef.dismiss(true);
    }

  }

  remove(){
    // console.log(this.current);
    this.pieceModalService.remove(this.piece.id)
    .subscribe(result => {
        let data=result.json();
        this.pieces.forEach((p, i) => {
                if (p.id === this.piece.id) {
                  this.pieces.splice(i, 1);
                }else{
                  console.log("nothing");
                }
          });
    });
    this.modalRef.dismiss(true);
  }
}
