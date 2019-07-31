import { Component, OnInit } from '@angular/core';
import { SupplierPreferredListService } from './supplier-preferred-list.service';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $: any;
@Component({
  selector: 'app-supplier-preferred-list',
  templateUrl: './supplier-preferred-list.component.html',
  styleUrls: ['./supplier-preferred-list.component.css']
})
export class SupplierPreferredListComponent implements OnInit {
  public preferedSuppliersData: any;
  public suppliersGroupData: any;
  public groupName: any;
  public limit: number = 1;
  public userdata = [];
  public custId: any;
  public supplierId: any;
  public pereferredID: any;
  public SupplierDiv = false;
  public res: any;
  public searchPrefSupplierData: any;
  public searchPrefStatus: any;
  public groupId:any;
  public selectedSupplierId:any;
  preferredSuppliersCount :number;
  isDisplayList = false;
  constructor(private supplierPreferedService: SupplierPreferredListService, private toastr: ToastrManager) { }

  ngOnInit() {
    $('#PerferredListPopUp').hide();
    this.getSupplierGroups();
  }

  /* Get suppliers group list */
  getSupplierGroups() {
    this.supplierPreferedService.getSupplierGroups().subscribe(res => {
      this.suppliersGroupData = res.supplierGroups;
      this.getPreferredSuppliersList(this.suppliersGroupData[0].supplier_setting_id, this.suppliersGroupData[0].group_name);
    })
  }

  /* Get prefered suppliers list */
  getPreferredSuppliersList(groupId, groupname) {
    this.groupName = groupname;
    this.groupId = groupId;
    this.supplierPreferedService.getPreferredSuppliersList(groupId, this.limit).subscribe(result => {
      this.preferedSuppliersData = result.preferredSuppliers;
      this.res = result.success;
      this.preferredSuppliersCount = result.preferredSuppliersCount;
      console.log(result);
    })
  }

  /* Add prefered Supplier */
  addPreferredSupplier(supplierId, addedBy, index) {
    this.supplierId = supplierId;
    this.userdata = JSON.parse(localStorage.getItem('currentUser'));
    this.custId = this.userdata['userData']['user_table_id'];
    this.supplierPreferedService.addPreferredSupplier({ 'customer_id': this.custId, 'supplier_id': supplierId, 'added_by': addedBy }).subscribe(data => {
      this.pereferredID = data.PereferredID;
       if (data.success == 1) {
        this.preferredSuppliersCount++;
        if (this.preferedSuppliersData[index]['user_supplier_id'] == this.supplierId) {
          this.preferedSuppliersData[index]['prefered_id'] = this.pereferredID;
          this.toastr.successToastr('Supplier added successfully!','Success');
        }
      }
      else {
        this.toastr.errorToastr('Supplier not added successfully!','Oops!!');
      }
    })
  }

  /* Delete prefered Supplier */
  deletePreferredSupplier(prefId, supplierId, index) {
    this.selectedSupplierId=supplierId;
    this.supplierPreferedService.deletePreferredSupplier(prefId).subscribe(response => {
      if (response.success == 1) {
        this.preferredSuppliersCount--;
        if (this.preferedSuppliersData[index]['user_supplier_id'] == supplierId) {
          this.preferedSuppliersData[index]['prefered_id'] = null;
          this.toastr.successToastr('Supplier removed successfully!','Success');
        }
      }
      else {
        this.toastr.errorToastr('Supplier NOT removed successfully!','Oops!!');
      }
    })
  }

  /* On selected group name display preffered supplier  */
  searchPrefSupplier(groupId) {
    this.supplierPreferedService.getOnlyPreferredSuppliers(groupId, this.limit).subscribe(result => {
      this.searchPrefSupplierData = result.preferredSuppliers;
      console.log(result);
      //this.searchPrefStatus = result;
     /*  if (this.searchPrefStatus.status == 1) {
        if (this.preferedSuppliersData[groupId]['user_supplier_id'] == this.selectedSupplierId) {
          this.preferedSuppliersData[groupId]['prefered_id'] = null;
          this.searchPrefSupplierData=null;
          this.toastr.successToastr('Supplier removed successfully!');
        }
      } */
    })
  }

  /* Displau preferred lsit popup */
  DisplayPreferredSupplierPopUp(){
    this.isDisplayList =true;
    $('#PerferredListPopUp').show();
    this.searchPrefSupplier(this.suppliersGroupData[0].supplier_setting_id);
  }

  /* Close popup */
  ClosePopUp(){
    this.isDisplayList =false;
    $('#PerferredListPopUp').hide();
  }
  
  /* On Search get preffered supplier */
  searchPrefSup(searchData) {
    this.supplierPreferedService.getSearchedPrefSupplier(this.groupId,this.limit,searchData).subscribe(result => {
      this.preferedSuppliersData = result.preferredSuppliers;
      this.res = result.success;
    })
  }
  /* Group Tab active  */
  dispalyGroupTab(info) {
    this.groupName = info;
  }

  /* On scroll */
  onScroll() {
    console.log('scrolled!!');
    this.limit += 1;
    this.getPreferredSuppliersList('', '');
  }

}
