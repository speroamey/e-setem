import { Component, OnInit,Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {AptitudesModalService} from './modal-service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-langues',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css'],
  animations: [routerTransition()]
})
export class AptitudesComponent implements OnInit {

  closeResult: string;
    private formation:any;
    private lists:any[];
    private list:any;
    public formations:any[];
    private current:any;
    private modalRef :any;
    private prestations:any[];
    @Input() user_id: any;
    levels: any[];
    langues: any[];
    competences: any[];
    branches: any[];
    competences_branches: any[];
    competenceBranche: any;
    cnd_update: boolean = false;

    constructor(private modalService: NgbModal,
                public activeModal: NgbActiveModal,
                 private pieceModalService:AptitudesModalService,
                 private toastr: ToastrService
                 ) {

        this.formation={};
        this.competenceBranche={};
        this.formations=[];
        this.list={};
        this.lists=[];
        this.competences_branches=[];
        
    }

    ngOnInit() {
     if(this.user_id){
        this.load(this.user_id);
      }else{
        this.load(sessionStorage.getItem('user_id'));
      }
      this.loadCompetence();
    }

    addAptitudeList(){
      this.lists.push(this.list);
      // console.log(this.lists);
    }

    onCompetenceChange(id){
      this.loadBranche(id);
      // console.log(this.lists);
    }

    private loadCompetence(){
      this.pieceModalService.loadCompetences()
      .subscribe(result => {
              if (result) {
                let res = result.json();
                this.competences = res;
              }
      });
    }
 


    openCompetenceBrancheOfAptitudes(content,pres?,else_condition?) {
      if(pres !== undefined){
        let tmp= JSON.parse(JSON.stringify(pres))
        this.competenceBranche =tmp;
        console.log(this.competenceBranche);
        this.onCompetenceChange(this.competenceBranche.competence_id);
        this.cnd_update=true;        
      }else{
        this.competenceBranche={};
      }

      this.modalRef = this.modalService.open(content)
      this.modalRef.result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }



    open(content,pres?,else_condition?) {
      this.formation = {};
      this.competenceBranche={};
      this.lists=[];
      this.list={};
      if(pres !== undefined && !else_condition){
        let tmp= JSON.parse(JSON.stringify(pres))
        this.formation =tmp;
      }else{
        this.formation = {};
        this.competenceBranche={};
        this.lists=[];
        this.list={};
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

  private load(id){
    this.pieceModalService.load(id)
    .subscribe(result => {
            if (result) {
              let res = result.json();
              this.formations=res;
              for (let i = 0; i <  this.formations.length; i++) {
                this.pieceModalService.loadCompetencesBranches( this.formations[i].id)
                .subscribe(result => {
                        if (result) {
                          let res = result.json();
                          this.formations[i].competences_branches=res;
                        }
                });
              }
            }            
    });
  }

  private loadBranche(id){
    this.pieceModalService.loadBranches(id)
    .subscribe(result => {
            if (result) {
              let res = result.json();
              this.branches = res;
            }
    });
  }
 
  retrieveCompetenceBranche(id):any{
   this.pieceModalService.loadCompetencesBranches(id)
    .subscribe(result => {
            if (result) {
              let res = result.json();
              this.formations.push(res);
              return  res;
            }
    });
  }


  save(){
    this.formation.competences_branches=this.lists;
      if (this.user_id) {
        this.formation.user_id = this.user_id;
      } else {
        this.formation.user_id = sessionStorage.getItem('user_id');
      }
      if ( this.cnd_update == true) {
        this.pieceModalService.update_c_b_a(this.competenceBranche.id,this.competenceBranche)
            .subscribe(result => {
              for (let index = 0; index < this.formations.length; index++) {                
                if (this.competenceBranche.aptitude_id == this.formations[index].id) {
                  this.pieceModalService.loadCompetencesBranches(this.competenceBranche.aptitude_id)
                    .subscribe(result => {
                            if (result) {
                              let res = result.json();                              
                              this.formations[index].competences_branches=res;
                            }
                    });
                    break;
                }
              }
          },
          error=>{
            this.toastr.error('Ce code/libellé existe déja !', 'Impossible d\'ajouter!');
          });
          // this.formation={};
          this.modalRef.dismiss(true);
      }else 
        if(this.formation.id && this.cnd_update == false) {
          this.pieceModalService.update(this.formation.id,this.formation)
            .subscribe(result => {
              // let index=this.formations.findIndex((current)=>{
              //   return current.id=this.formation.id;
              // })

              for (let index = 0; index < this.formations.length; index++) {
                if (this.formation.id==this.formations[index].id) {
                  this.formations[index] = this.formation;
                  this.pieceModalService.loadCompetencesBranches(this.formation.id)
                  .subscribe(result => {
                            let res = result.json();
                            this.formation.competences_branches=res;
                  })
                  break;
                }
              }
              // this.formations[index]=this.formation
          });
          // this.formation={};
          this.modalRef.dismiss(true);
      } else {
        this.pieceModalService.add(this.formation)
          .subscribe(result => {
            let res_formation= result.json()
            this.pieceModalService.loadCompetencesBranches(res_formation.id)
              .subscribe(result => {
                      if (result) {
                        let res = result.json();
                        res_formation.competences_branches=res;
                      }
              });
              this.formations.push(res_formation);
      });
      // this.formation={};
      this.modalRef.dismiss(true);
    }
    this.cnd_update = false;
  }

  remove(){
    // console.log(this.current);
    this.pieceModalService.remove(this.formation.id)
    .subscribe(result => {
        let data=result.json();
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

  removeCompetenceBranche(){    
    this.pieceModalService.removeCompetenceBranche(this.competenceBranche.id)
    .subscribe(result => {
        let data=result.json();
          for (let index = 0; index < this.formations.length; index++) {
            if (this.competenceBranche.aptitude_id == this.formations[index].id) {
              this.formations[index].competences_branches.forEach((p, i) => {
                if (p.id === this.competenceBranche.id) {
                  this.formations[index].competences_branches.splice(i, 1);
                }else{
                  console.log("nothing");
                }
               });
            }
         }
    },
    error=>{
      //something else
    });
    this.modalRef.dismiss(true);
  }


}
