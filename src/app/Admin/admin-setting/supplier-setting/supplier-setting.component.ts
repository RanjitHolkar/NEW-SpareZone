import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminSettingService } from '../admin-setting.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../../environments/environment';

declare var $: any;
@Component({
  selector: 'app-supplier-setting',
  templateUrl: './supplier-setting.component.html',
  styleUrls: ['./supplier-setting.component.css']
})
export class SupplierSettingComponent implements OnInit {
  editpoup = false;
  supplierGroups: any;
  supplierGroupForm: FormGroup;
  isGroupSumitted = false;
  formTitle: string;
  editIndex = '';
  constructor(private formBuilder: FormBuilder, private AdminService: AdminSettingService, private toastr: ToastrManager) { }

  ngOnInit() {
    $("#addGroup").hide();
    this.getAllGroups();
    this.createSupplierFormGroup();
  }
  /* get list of all groups */
  getAllGroups() {
    $('.overlayDivLoader').show();
    this.AdminService.getAllGroups().subscribe((response: any) => {
      $('.overlayDivLoader').hide();
      console.log(response);
      this.supplierGroups = response.supplierGroups;
    })
  }

  /* Create form group for adding the supplier groups */
  createSupplierFormGroup() {
    this.supplierGroupForm = this.formBuilder.group({
      group_name: ['', Validators.required],
      group_indicator_color: ['', Validators.required]
    })
  }
  get groupF() {
    return this.supplierGroupForm.controls
  }

  /* Dislpay Pop Up */
  displayPopUp(title) {
    this.editpoup = false;
    this.formTitle = title;
    this.supplierGroupForm.reset();
    $("#addGroup").show();
  }

  /* Dislpay Pop Up */
  ClosePopUp() {
    this.supplierGroupForm.reset();
    this.editIndex = '';
    $("#addGroup").hide();
  }

  /* Save the new group details */
  saveGroup() {
    this.isGroupSumitted = true;
    if (this.supplierGroupForm.valid) {
      this.isGroupSumitted = false;
      $('.overlayDivLoader').show();
      this.AdminService.saveSupplierGroup(this.supplierGroupForm.value).subscribe((response: any) => {
        $('.overlayDivLoader').hide();
        if (!response.status)
          this.toastr.errorToastr(response.message, 'Oops!');
        else if (!!response.status) {
          $("#addGroup").hide();
          this.toastr.successToastr(response.message, 'Success');
          var data = this.supplierGroupForm.value;
          data['supplier_setting_id'] = response.groupID;
          this.supplierGroups.push(data);
        }
      }, error => {
        console.log(error);
      })
    }
  }

  /* Open Edit groups popUp */
  OpenEditpopUp(editData, index, title) {

    console.log(editData);
    console.log(index);
    this.editIndex = index;
    
    this.displayPopUp(title);
    this.editpoup = true;
    //this.supplierGroupForm.addControl('supplier_setting_id', new FormControl(editData.supplier_setting_id, Validators.required));
    this.supplierGroupForm.controls['group_name'].setValue(editData.group_name);
    this.supplierGroupForm.controls['group_indicator_color'].setValue(editData.group_indicator_color);
  }

  /* Update group */
  updateSupplierGroup() {
    this.isGroupSumitted = true;
    if (this.supplierGroupForm.invalid) {
      return false;
    }
    this.isGroupSumitted = false;
    $('.overlayDivLoader').show();
    let updateData = this.supplierGroupForm.value;
    updateData['supplier_setting_id'] = this.supplierGroups[this.editIndex].supplier_setting_id;

    this.AdminService.updateSupplierGroup(updateData).subscribe((result: any) => {
      console.log(result);
      if (result.status) {
        this.toastr.successToastr(result.message, 'Success');
        this.supplierGroups[this.editIndex] = updateData;
        this.ClosePopUp();
      } else {
        this.toastr.errorToastr(result.message, 'Oops!!');
      }
      $('.overlayDivLoader').hide();
    }, error => {
      this.toastr.errorToastr(error, 'ERROR!!');
      $('.overlayDivLoader').hide();
      this.ClosePopUp();
    })
  }

}
