import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FicheRenseignementsModalService } from './modal-service'
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-fiche-renseignements',
  templateUrl: './fiche-renseignements.component.html',
  animations: [routerTransition()]
})
export class FicheRenseignementsComponent implements OnInit {
  closeResult: string;
  public identite: any;
  public identites: any[];
  private current: any;
  private modalRef: any;
  private prestations: any[];
  private _subscription: Subscription;
  public userId:any;
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private pieceModalService: FicheRenseignementsModalService,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.identite=[];
    this.identite={};
  }



  ngOnInit() {
    
    this._subscription = this._activatedRoute.params.subscribe((params: any[]) => {
      this.userId= parseInt(params['id']);
      // this.loadDetails(this.prestationId)
      this.load();
   });
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

  
  open(content, pres?) {
    alert(this.identite);
    if (pres !== undefined) {
     
      let tmp = JSON.parse(JSON.stringify(pres))
      this.identite = tmp;
    }
    // console.log(this.competence)
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
    this.pieceModalService.load(sessionStorage.getItem('user_id'))
      .subscribe(result => {
        // console.log("result");
        if (result) {
          let res = result.json();
        
          this.identite= this.identites;
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

  save() {
    console.log(this.identite);
    
    this.identite.birthday = this.extractDay(this.identite.birthday);
    this.identite.user_id = sessionStorage.getItem('user_id');
    if (this.identite.id) {
      //call service
      this.pieceModalService.update(this.identite.id, this.identite)
        .subscribe(result => {
          console.log(this.identites);
          let index = this.identites.findIndex((current) => {
            return current.id = this.identite.id;
          })
          this.identites[index] = this.identite
        });
      this.modalRef.dismiss(true);
    } else {
    
      this.pieceModalService.add(this.identite)
        .subscribe(result => {
          console.log(result);
          
          this.identites.push(result.json());
        });
      this.modalRef.dismiss(true);
    }

  }

  remove() {
    // console.log(this.current);
    this.pieceModalService.remove(this.identite.id)
      .subscribe(result => {
        let data = result.json();
        // console.log('jsut pr tester',data);
        // if (data == 1) {
        //   this.identites.splice(this.identite.id, 1);
        // }
        this.identites.forEach((p, i) => {
          if (p.id === this.identite.id) {
            this.identites.splice(i, 1);
          } else {
            console.log("nothing");
          }
        });
      });
    this.modalRef.dismiss(true);
  }
}
