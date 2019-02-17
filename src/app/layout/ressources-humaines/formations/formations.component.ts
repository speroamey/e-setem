import { Component, OnInit,Input } from '@angular/core';
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
    @Input() user_id: any;
    diplomes: any[];

    constructor(private modalService: NgbModal,
                public activeModal: NgbActiveModal,
                 private pieceModalService:FormationsModalService,
                 ) {

        this.formation={};
        this.diplomes=['CEP','BEPC','CAP','BAC','BAC+1','BAC+2','BAC+3','BAC+4','BAC+5','BAC+6','BAC+7','BAC+8','BAC+9 et Plus',"Je n'ai pas de diplome"];
    }

    ngOnInit() {

     if(this.user_id){
      this.load(this.user_id);
    }else{
      this.load(sessionStorage.getItem('user_id'));
    }
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
        tmp.start_date = this.convertDate(tmp.start_date);
        tmp.end_date = this.convertDate(tmp.end_date);

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

  private load(id){
    this.pieceModalService.load(id)
    .subscribe(result => {
            // console.log("result");
            if (result) {
              // console.log(result.json());
              let res = result.json();
              this.formations = res;
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
   console.log(this.formation.start_date);
   
   
    // this.formation.user_id = sessionStorage.getItem('user_id');
    if (this.user_id) {
      this.formation.user_id = this.user_id;
    } else {
      this.formation.user_id = sessionStorage.getItem('user_id');
    }

    this.formation.start_date = this.extractDay(this.formation.start_date);
    this.formation.end_date = this.extractDay(this.formation.end_date);
    console.log(this.formation.start_date);
    
    
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
