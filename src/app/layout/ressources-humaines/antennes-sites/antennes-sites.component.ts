import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {AntennesSitesModalService} from './modal-service'


@Component({
  selector: 'app-antennes-sites',
  templateUrl: './antennes-sites.component.html',
  styleUrls: ['./antennes-sites.component.css'],
  animations: [routerTransition()]
})
export class AntennesSitesComponent implements OnInit {
  closeResult: string;
  private antenne_site:any;
  public antennes_sites:any[];
  private current:any;
  private modalRef :any;
  private prestations:any[];
  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal,
               private pieceModalService:AntennesSitesModalService,
               ) {

      this.antenne_site={};
  }

  ngOnInit() {
   this.load();
  }

  open(content,pres?) {

    if(pres !== undefined){
      let tmp= JSON.parse(JSON.stringify(pres))
      this.antenne_site =tmp;
    }
    // console.log(this.antenne_site)
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
          // console.log("result");
          if (result) {
            // console.log(result.json());
            let res = result.json();
            this.antennes_sites = res;
          }
          //  return null;
  });
}

save(){
   if (this.antenne_site.id) {
      //call service
      this.pieceModalService.update(this.antenne_site.id,this.antenne_site)
      .subscribe(result => {
        console.log( this.antennes_sites);
          let index=this.antennes_sites.findIndex((current)=>{
            return current.id=this.antenne_site.id;
          })
          this.antennes_sites[index]=this.antenne_site
      });
      this.modalRef.dismiss(true);
  } else {
    this.pieceModalService.add(this.antenne_site)
    .subscribe(result => {
      console.log(result.json());
        this.antennes_sites.push(result.json());
    });
    this.modalRef.dismiss(true);
  }

}

remove(){
  // console.log(this.current);
  this.pieceModalService.remove(this.antenne_site.id)
  .subscribe(result => {
      let data=result.json();
      this.antennes_sites.forEach((p, i) => {
              if (p.id === this.antenne_site.id) {
                this.antennes_sites.splice(i, 1);
              }else{
                console.log("nothing");
              }
        });
  });
  this.modalRef.dismiss(true);
}

}
