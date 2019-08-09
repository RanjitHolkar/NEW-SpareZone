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
public customer_data:any;
public index:any;
  constructor(private membersListService:MembersListService,private toaster:ToastrManager) { }

  ngOnInit() {
    $('.overlayDivLoader').show(); 
    this.membersListService.getGroups().subscribe(res=>{
      this.groupType = res.supplierGroups;
    })
    this.membersListService.getStates().subscribe(res=>{
      this.states =res.states;
      console.log(res);
    })
    this.membersListService.getCustomerListing(this.limit).subscribe(res=>{
      this.memberListing = res.states;
      console.log(res);
      $('.overlayDivLoader').hide(); 
    })
   
  }
  activeDeactiveSupplier(index,status,customer_id,email_id){
    this.index =index;
    this.customer_data ={customer_id:customer_id,cust_status:status,email_id:email_id};
    this.confirmationPopUp=true;
  }
  confirmActionSupplier(){
    $('.overlayDivLoader').show(); 
    this.membersListService.activeDeactiveSupplier(this.customer_data).subscribe(res=>{
      console.log( this.customer_data['cust_status']);
      this.memberListing[this.index]['cust_status'] = this.customer_data['cust_status'];
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
