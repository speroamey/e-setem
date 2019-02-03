import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {PiecesAdministrativesModalService} from './modal-service'

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
    constructor(private modalService: NgbModal,
                public activeModal: NgbActiveModal,
                 private pieceModalService:PiecesAdministrativesModalService,
                 ) {

        this.piece={};
    }

    ngOnInit() {
     this.load();
    }

    public convertDate(arg){
      let obj=new Date(arg);
      let _date;
      let day = obj.getDate();
      let month = obj.getMonth()+1;
      let year = obj.getFullYear();

      return _date={
        day:day,
        month:month,
        year:year
      }
    }
    open(content,pres?) {
     
      if(pres !== undefined){
        let tmp= JSON.parse(JSON.stringify(pres))
        tmp.expiration_cin = this.convertDate(tmp.expiration_cin);
        tmp.expiration_passport = this.convertDate(tmp.expiration_passport);
        tmp.date_naissance = this.convertDate(tmp.date_naissance);
        tmp.date_embauche = this.convertDate(tmp.date_embauche);

        this.piece =tmp;
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
    this.pieceModalService.load()
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

  extractDay(arg){
    let day = arg.day;
    let month = arg.month-1;
    let year = arg.year;
    let dat =new Date(year,month,day);
    return dat;
  }
  save(){
    // console.log( this.piece);
    
    // console.log(this.piece.date_naissance);
    
    this.piece.expiration_cin = this.extractDay(this.piece.expiration_cin);
    
    this.piece.expiration_passport = this.extractDay(this.piece.expiration_passport);
    
     this.piece.date_naissance = this.extractDay(this.piece.date_naissance);
     this.piece.date_embauche = this.extractDay(this.piece.date_embauche);

    console.log( this.piece);

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
          // console.log(this.piece);
          // console.log(result.json());
          this.pieces.push(result.json());
      });
      this.modalRef.dismiss(true);
    }

  }

  remove(){
    // console.log(this.current);
    this.pieceModalService.remove(this.piece.id)
    .subscribe(result => {
        let data=result.json();
        console.log('jsut pr tester',data);
        // if (data == 1) {
        //   this.pieces.splice(this.piece.id, 1);
        // }
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
