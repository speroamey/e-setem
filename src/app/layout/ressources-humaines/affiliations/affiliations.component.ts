import { Component, OnInit,Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {BranchesModalService} from './modal-service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-affiliation',
  templateUrl: './affiliations.component.html',
  styleUrls: ['./affiliations.component.css'],
  animations: [routerTransition()]
})
export class AffiliationsComponent implements OnInit {

  closeResult: string;
    private branche:any;
    public branches:any[];
    private current:any;
    private modalRef :any;
    private prestations:any[];
    @Input() user_id: any;

    constructor(private modalService: NgbModal,
                public activeModal: NgbActiveModal,
                 private pieceModalService:BranchesModalService,
                 private toastr: ToastrService
                 ) {

        this.branche={};
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
        this.branche =tmp;
      }
      // console.log(this.branche)
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
              this.branches = res;
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
    
    // this.branche.user_id = sessionStorage.getItem('user_id');
    if (this.user_id) {
      this.branche.user_id = this.user_id;
    } else {  
      this.branche.user_id = sessionStorage.getItem('user_id');
    }
    this.branche.start_date = this.extractDay(this.branche.start_date);
    this.branche.end_date = this.extractDay(this.branche.end_date);
    
    if (this.branche.id) {
        //call service
        this.pieceModalService.update(this.branche.id,this.branche)
        .subscribe(result => {
            let index=this.branches.findIndex((current)=>{
              return current.id=this.branche.id;
            })
            this.branches[index]=this.branche
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
    // console.log(this.current);
    this.pieceModalService.remove(this.branche.id)
    .subscribe(result => {
        let data=result.json();
        // console.log('jsut pr tester',data);
        // if (data == 1) {
        //   this.branches.splice(this.branche.id, 1);
        // }
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
