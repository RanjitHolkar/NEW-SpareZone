import { Component, OnInit } from '@angular/core';
import { AdminSupplierService } from './admin-supplier.service';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $;
@Component({
  selector: 'app-admin-supplier',
  templateUrl: './admin-supplier.component.html',
  styleUrls: ['./admin-supplier.component.css']
})
export class AdminSupplierComponent implements OnInit {
  public groupType:any;
  public states:any;
  public limit =1;
  public memberListing:any;
  public confirmationPopUp = false;
  public supplier_data:any;
  public index:any;
  constructor( private adminSupplierService:AdminSupplierService,private toaster:ToastrManager) { }

  ngOnInit() {
    $('.overlayDivLoader').show(); 
    this.adminSupplierService.getGroups().subscribe(res=>{
      this.groupType = res.supplierGroups;
     
    })
    this.adminSupplierService.getStates().subscribe(res=>{
      this.states =res.states;
    })
    this.adminSupplierService.getSupplierListing(this.limit).subscribe(res=>{
      this.memberListing = res.suppliers;
      $('.overlayDivLoader').hide(); 
      console.log(res);
    })
   
  }
  activeDeactiveSupplier(index,status,supplier_id){
    this.index =index;
    this.supplier_data ={supplier_id:supplier_id,supplier_status:status};
    this.confirmationPopUp=true;
  }
  confirmActionSupplier(){
    $('.overlayDivLoader').show(); 
    this.adminSupplierService.activeDeactiveSupplier(this.supplier_data).subscribe(res=>{
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
