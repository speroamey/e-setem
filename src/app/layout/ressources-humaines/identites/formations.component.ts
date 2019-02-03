import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormationsModalService} from './modal-service'

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css'],
  animations: [routerTransition()]
})
export class FormationsComponent implements OnInit {

  closeResult: string;
    private formation:any;
    public formations:any[];
    private current:any;
    private modalRef :any;
    private prestations:any[];
  roles: string[];
  sexes: string[];
  categories: string[];
  anciennetes: string[];
    constructor(private modalService: NgbModal,
                public activeModal: NgbActiveModal,
                 private pieceModalService:FormationsModalService,
                 ) {
        this.formations=[];
        this.formation={};
        this.roles=['ADMIN','USER'];
        this.sexes=['Masculin','Féminin'];
        this.anciennetes=['0-5','6-10','11-15','Plus'];
        this.categories=['Expert','Ingénieur','Technicien Supérieur','Exécutant'];
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
        tmp.birthday = this.convertDate(tmp.birthday);
      

        this.formation =tmp;
        console.log(this.formation );
        
      }
      // console.log(this.formation)
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
            // console.log("result");
            if (result) {
              // console.log(result.json());
              let res = result.json();
              this.formations.push(res);
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
   console.log(this.formation);
   
   
    this.formation.user_id = sessionStorage.getItem('user_id');
    this.formation.birthday = this.extractDay(this.formation.birthday);
    console.log(this.formation);
    
    
    if (this.formation.id) {
      
        //call service
        this.pieceModalService.update(this.formation.id,this.formation)
        .subscribe(result => {
          console.log( this.formations);
            let index=this.formations.findIndex((current)=>{
              return current.id=this.formation.id;
            })
            this.formations[index]=this.formation
        });
        // this.formation={};
        this.modalRef.dismiss(true);
    } else {
      this.pieceModalService.add(this.formation)
      .subscribe(result => {
          this.formations.push(result.json());
      });
      // this.formation={};
      this.modalRef.dismiss(true);
    }

  }

  remove(){
    // console.log(this.current);
    this.pieceModalService.remove(this.formation.id)
    .subscribe(result => {
        let data=result.json();
        // console.log('jsut pr tester',data);
        // if (data == 1) {
        //   this.formations.splice(this.formation.id, 1);
        // }
        this.formations.forEach((p, i) => {
                if (p.id === this.formation.id) {
                  this.formations.splice(i, 1);
                }else{
                  console.log("nothing");
                }
          });
    });
    this.modalRef.dismiss(true);
  }

}
