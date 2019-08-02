import { Component, OnInit } from '@angular/core';
import { MembersListService } from './members-list.service';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $;
@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
public groupType:any;
public states:any;
public limit =1;
public memberListing:any;
public confirmationPopUp = false;
public supplier_data:any;
public index:any;
  constructor(private membersListService:MembersListService,private toaster:ToastrManager) { }

  ngOnInit() {
    $('.overlayDivLoader').show(); 
    this.membersListService.getGroups().subscribe(res=>{
      this.groupType = res.supplierGroups;
    })
    this.membersListService.getStates().subscribe(res=>{
      this.states =res.states;
    })
    this.membersListService.getSupplierListing(this.limit).subscribe(res=>{
      this.memberListing = res.states;
    })
    $('.overlayDivLoader').hide(); 
  }
  activeDeactiveSupplier(index,status,supplier_id){
    this.index =index;
    this.supplier_data ={supplier_id:supplier_id,supplier_status:status};
    this.confirmationPopUp=true;
  }
  confirmActionSupplier(){
    $('.overlayDivLoader').show(); 
    this.membersListService.activeDeactiveSupplier(this.supplier_data).subscribe(res=>{
      console.log( this.supplier_data['supplier_status']);
      this.memberListing[this.index]['supplier_status'] = this.supplier_data['supplier_status'];
      if(res.status == 1){
        this.toaster.successToastr(res.message);
      }else{
        this.toaster.errorToastr(res.message);
      }
    $('.overlayDivLoader').hide(); 
      this.confirmationPopUp=false;
    })
  }

}
