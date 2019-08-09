import { Component, OnInit } from '@angular/core';
import { SupplierEditService } from './supplier-edit.service';
import { Form,FormBuilder,FormArray,FormControl,FormGroup,Validators} from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';
import {AuthenticationService} from '../../../services/authentication.service';
declare var $;

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent implements OnInit {
public userDetails:any;
public businessType:any;
public editForm:FormGroup;
public addSubSupplier:FormGroup;
public submit =false;
public base_url = environment.base_url;
public images:any;
public imagesUrl:any;
public viewDetails :any;
public submited:any;
public subSupplierDetails:any;
public subSupplierId:any;
public acctionButton:any;
public editIndex:any;
public supplierGroup:any;
public user_id:any;
public confirmationPopUp = false;
  allStates : any;
  constructor(
    private _supplierEditService:SupplierEditService,
    private _formBuilder:FormBuilder,
    private toastr:ToastrManager,private commonService:AuthenticationService) { }

  ngOnInit() {
    $('.overlayDivLoader').show();
    this.acctionButton = 'Save';
    this.viewDetails = true;
    this.submited = false;
    this.userDetails;
    let data = JSON.parse(localStorage.getItem('currentUser'));
    this.user_id = data.userData.user_table_id;
    this.editForm = this._formBuilder.group({
      business_name:['',Validators.required],
      contact_person:['',Validators.required],
      business_address:['',Validators.required],
      suburbs:['',Validators.required],
      postcode:['',Validators.required],
      state:['',Validators.required],
      business_abn:['',Validators.required],
      personal_contact:['',Validators.required],
      email_id:['',Validators.required],
      business_type:['',Validators.required],
      is_capricon:['',Validators.required],
      group_id:['',Validators.required]
    })
    this.addSubSupplier = this._formBuilder.group({
      user_id:['',Validators.required],
      password:['',Validators.required],
      full_name:['',Validators.required],
      employer_id:['',Validators.required],
      position:['',Validators.required],
      supplier_id:[''],
      email_id:['',[Validators.email,Validators.required]]
    })
   this.getSupplierDetails();
   this.getBusinessType();
   this.getSubSupplierDetails();
   this.getgroupType();
   this.getStates();
  }

  /* Get All States */
  getStates(){
    this.commonService.getAllStates().subscribe((result:any)=>{
      this.allStates = result.states;
      console.log(result);
    })
  }

  //This Function For get Upload Files
  uploadFiles(event){
    if (event.target.files && event.target.files[0]) {
      this.images = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imagesUrl = reader.result;
      reader.readAsDataURL(this.images);
    }
  }
  
  // This Function For Get Supplier Details
  getSupplierDetails(){
    $('.overlayDivLoader').show();
    this.userDetails;
    this._supplierEditService.getUserDetails().subscribe(res=>{
      this.userDetails = res.res;
      $('.overlayDivLoader').hide();
      if(this.userDetails.profile_logo){
        this.userDetails.profile_logo = environment.base_url + this.userDetails.profile_logo;
      }else{
        this.userDetails.profile_logo = environment.base_url + res.defaultImages.sup_logo;
      }
      console.log('ZX',this.userDetails);
      console.log('ZX',);
    })
  }
  // This Function For Get Business Type
  getBusinessType(){
    $('.overlayDivLoader').show();
    this._supplierEditService.getBusinessType().subscribe(res=>{
      this.businessType = res['businessTypeData'];
      console.log(this.businessType);
    $('.overlayDivLoader').hide();
    }) 
  }
  // This Function For Get Sub Supplier Details
  getSubSupplierDetails(){
    $('.overlayDivLoader').show();
    this._supplierEditService.getSubSupplier().subscribe(res=>{
      this.subSupplierDetails= res;
      console.log(this.subSupplierDetails);
    $('.overlayDivLoader').hide();   
    }) 
  }
  //This Function For Get Supplier Groups
  getgroupType(){
    $('.overlayDivLoader').show();
    this._supplierEditService.getgroupType().subscribe(res=>{
      this.supplierGroup = res['supplierGroups'];
    $('.overlayDivLoader').hide();
      console.log(res);
    }) 
  }
  //This Function For  return Form Controls
  get f(){return this.editForm.controls}
  //This Function For Update Supplier Details
  updateDetails(){
    this.submit = true;
    if(this.editForm.valid){
    $('.overlayDivLoader').show();
      let formData = new FormData();
        if(this.images !=undefined){
        formData.append('profile_logo',this.images);
        }
        formData.append('business_name',this.editForm.value.business_name);
        formData.append('contact_person',this.editForm.value.contact_person);
        formData.append('business_address',this.editForm.value.business_address);
        formData.append('business_abn',this.editForm.value.business_abn);
        formData.append('business_type',this.editForm.value.business_type);
        formData.append('suburbs',this.editForm.value.suburbs);
        formData.append('postcode',this.editForm.value.postcode);
        formData.append('state',this.editForm.value.state);
        formData.append('is_capricon',this.editForm.value.is_capricon);
        formData.append('group_id',this.editForm.value.group_id);
        this._supplierEditService.updateDetails(formData).subscribe(res=>{
        $('.overlayDivLoader').hide();
        this.toastr.successToastr('Update Details Successfully');
        this.images = undefined;
        this.getSupplierDetails();
        this.viewDetails = true;
        this.submited = false;
        this.editForm.reset();
        console.log(res);
      })
    } 
  }
  numberOnly(event:any){
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  /* Add Sub Supplier :Start*/
  get fo(){return this.addSubSupplier.controls}
  addEditSubSupplier(){
    this.submited = true;
    if(this.addSubSupplier.valid){
      $('.overlayDivLoader').show();
      if(this.acctionButton == 'Save'){
        this.addSubSupplier.patchValue({supplier_id :this.user_id});
        this._supplierEditService.addSubSupplier(this.addSubSupplier.value).subscribe(res=>{
        $('.overlayDivLoader').hide();
          if(res.status == 1){
            this.addSubSupplier.patchValue({'sub_supplier_id':res.userId});
            this.toastr.successToastr(res.message);
           this.subSupplierDetails.unshift(this.addSubSupplier.value);
           this.addSubSupplier.reset();
           this.submited = false;
          }else{
            this.toastr.errorToastr(res.message);
          }
        })
      }else{
        $('.overlayDivLoader').show();
        let data = this.addSubSupplier.value;
        data['sub_supplier_id'] = this.subSupplierId;
        this._supplierEditService.updateSubSupplier(data).subscribe(res=>{
        $('.overlayDivLoader').hide();
          if(res.status == 1){
            this.toastr.successToastr(res.message);
            this.subSupplierDetails[this.editIndex]= data;
            this.addSubSupplier.reset();
          }else{
            this.toastr.errorToastr(res.message);
          }
          this.submited = false;
          // this.ngOnInit();
        })
      }   
    }
  }

  /*This Function For View Sub Supplier Details*/
  viewSubSupplierDetails(index,subSupplierId){
    this.addSubSupplier.get('password').setValidators([]);
    this.acctionButton = 'Edit';
    this.editIndex = index;
    this.subSupplierId = subSupplierId;
    this.addSubSupplier.setValue({
      user_id:this.subSupplierDetails[index].user_id,
      password:'',
      supplier_id:this.subSupplierDetails[index].supplier_id,
      full_name:this.subSupplierDetails[index].full_name,
      employer_id:this.subSupplierDetails[index].employer_id,
      position:this.subSupplierDetails[index].position,
      email_id:this.subSupplierDetails[index].email_id
    })
  }

  /* This Function For Remove Sub Supplier show Popup Details*/
  removeSubSupplier(index,subSupplierId){
    this.subSupplierId = subSupplierId;
    this.editIndex = index;
    this.confirmationPopUp= true; 
  }
  //Add Supplier Form Show 
  addSubSupplierForm(){
    this.addSubSupplier.get('password').setValidators([Validators.required]);
  }
  /* This Function For confirm Remove Sub Supplier Details*/
  confirmRemoveSubSupplier(){
    $('.overlayDivLoader').show();

    this._supplierEditService.deleteSubSupplier({'sub_supplier_id':this.subSupplierId}).subscribe(res=>{
    $('.overlayDivLoader').hide();
      if(res == 1){
        this.subSupplierDetails.splice(this.editIndex, 1);
        this.toastr.successToastr('Delete Sub Supplier Successfully');
      }else{
        this.toastr.errorToastr('Not Delete');
      }
      this.confirmationPopUp= false;
    })
  }


}

