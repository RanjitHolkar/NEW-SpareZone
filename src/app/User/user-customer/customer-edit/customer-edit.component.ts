import { Component, OnInit } from '@angular/core';
import { CustomerEditService } from './customer-edit.service';
import { Form, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';
import {AuthenticationService} from '../../../services/authentication.service';
declare var $;
@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  public customerDetails = [];
  public accountType: any;
  public businessForm: FormGroup;
  public personalForm: FormGroup;
  public submit = false;
  public businessType: any;
  public images: any;
  public imagesUrl: any;
  public submited = false;
  public BaseUrl = environment.base_url;
  allStates : any;
  constructor(private _customerEditService: CustomerEditService, private fb: FormBuilder, private toastr: ToastrManager,private commonService:AuthenticationService) { }

  ngOnInit() {
    $(".overlayDivLoader").show();
    this.getUserDetails();
    this.getBusinessType();
    this.getStates();
    this.businessForm = this.fb.group({
      business_name: ['', Validators],
      contact_person: ['', Validators.required],
      personal_contact: ['', Validators.compose([Validators.required,Validators.pattern(/^\+?\d{2}[- ]?\d{4}[- ]?\d{4}$/)])],
      business_address: ['', Validators.required],
      state: ['', Validators.required],
      business_abn: ['', Validators.required],
      business_contact: ['', Validators.compose([Validators.required,Validators.pattern(/^\+?\d{2}[- ]?\d{4}[- ]?\d{4}$/)])],
      email_id: ['', Validators.required],
      business_type: ['', Validators.required],
    })
    this.personalForm = this.fb.group({
      user_name: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      contact_person: ['', Validators.required],
      personal_contact: ['', Validators.compose([Validators.required,Validators.pattern(/^\+?\d{2}[- ]?\d{4}[- ]?\d{4}$/)])],
      business_address: ['', Validators.required],
      suburbs: ['', Validators.required],
      postcode: ['', Validators.required],
      state: ['', Validators.required],
      email_id: ['', [Validators.required]],
    })
  }

  /* Get All States */
  getStates(){
    this.commonService.getAllStates().subscribe((result:any)=>{
      this.allStates = result.states;
      console.log(result);
    })
  }

  //This Function For Get User Details
  getUserDetails() {
    $(".overlayDivLoader").show();
    this._customerEditService.getUserDetails().subscribe(res => {
      this.customerDetails.push(res['res']);
      this.accountType = res['res']['account_type'];
      console.log(res);
      $(".overlayDivLoader").hide();
    })
  }
  //This Function For Get Business Type
  getBusinessType() {
      $(".overlayDivLoader").show();
    this._customerEditService.getBusinessType().subscribe(res => {
      this.businessType = res['businessTypeData'];
      $(".overlayDivLoader").hide();
    })
  }
  //This Function For get Upload Files
  fileUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.images = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imagesUrl = reader.result;
      reader.readAsDataURL(this.images);
    }
  }

  get f() { return this.businessForm.controls }
  //This function for Save Update Data
  updateDetails() {
    this.submit = true;
    if (this.businessForm.valid) {
      $(".overlayDivLoader").show();
      let formData = new FormData();
      if (this.images != undefined) {
        formData.append('profile_logo', this.images);
      }
      formData.append('business_name', this.businessForm.value.business_name);
      formData.append('contact_person', this.businessForm.value.contact_person);
      formData.append('business_address', this.businessForm.value.business_address);
      formData.append('state', this.businessForm.value.state);
      formData.append('business_abn', this.businessForm.value.business_abn);
      formData.append('business_contact', this.businessForm.value.business_contact);
      formData.append('business_type', this.businessForm.value.business_type);
      // formData.append('email_id',this.businessForm.value.email_id);
      // formData.append('personal_contact',this.businessForm.value.personal_contact);
      this._customerEditService.updateDetails(formData).subscribe(res => {
        this.toastr.successToastr('Update Details Successfully');
        this.images = undefined;
        this.submit = false;
        $(".overlayDivLoader").hide();
      })
    }
  }
  get pform() { return this.personalForm.controls }
  updatePersonalDetails() {
    this.submited = true;
    if (this.personalForm.valid) {
      $(".overlayDivLoader").show();
      let formData = new FormData();
      if (this.images != undefined) {
        formData.append('profile_logo', this.images);
      }
      formData.append('user_name', this.personalForm.value.user_name);
      formData.append('first_name', this.personalForm.value.first_name);
      formData.append('last_name', this.personalForm.value.last_name);
      formData.append('contact_person', this.personalForm.value.contact_person);
      formData.append('business_abn', this.personalForm.value.business_abn);
      // formData.append('personal_contact',this.personalForm.value.personal_contact);
      formData.append('suburbs', this.personalForm.value.suburbs);
      formData.append('postcode', this.personalForm.value.postcode);
      // formData.append('email_id',this.personalForm.value.email_id);
      this._customerEditService.updateDetails(formData).subscribe(res => {
        this.toastr.successToastr('Update Details Successfully');
        this.images = undefined;
        this.submited = false;
        $(".overlayDivLoader").hide();
      });
    }
  }
}

