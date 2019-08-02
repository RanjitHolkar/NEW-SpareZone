import { Component, OnInit } from '@angular/core';
import { Form,FormBuilder,FormArray,FormControl,FormGroup,Validators} from '@angular/forms';
import { SignupSupplierService } from './signup-supplier.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {Router} from '@angular/router';
declare var $;
@Component({
  selector: 'app-signup-supplier',
  templateUrl: './signup-supplier.component.html',
  styleUrls: ['./signup-supplier.component.css']
})
export class SignupSupplierComponent implements OnInit {
public supplierSignUpForm : FormGroup;
public supplierSignUpFormSecond : FormGroup;
public submit = false;
public images :any;
public businessType:any;
public supplierGroup:any;
  constructor(
    private formBuilder:FormBuilder,
    private _signupSupplierService:SignupSupplierService,
    private toastr:ToastrManager,
    private router:Router) { }

  ngOnInit() {
    $('.overlayDivLoader').show();
    this._signupSupplierService.getBusinessType().subscribe(res=>{
    $('.overlayDivLoader').hide();
      this.businessType = res['businessTypeData'];
      console.log('bussiness Type',this.businessType);
    })
    this._signupSupplierService.getgroupType().subscribe(res=>{
      this.supplierGroup = res['supplierGroups'];
    })
    this.supplierSignUpForm = this.formBuilder.group({
      first_name:['',Validators.required],
      last_name :['',Validators.required],
      user_name :['',Validators.required],
      personal_contact:['',Validators.required],
      business_address :['',Validators.required]
    })
    this.supplierSignUpFormSecond = this.formBuilder.group({
      business_name :['',Validators.required],
      personal_contact :['',Validators.required],
      mobile_no :['',Validators.required],
      contact_person :['',Validators.required],
      business_address :['',Validators.required],
      group_id:['',Validators.required],
      email_id : ['',[Validators.email,Validators.required]],
      business_abn : ['',Validators.required],
      business_type :['',Validators.required],
      suburbs :['',Validators.required],
      postcode :['',Validators.required],
      state :['',Validators.required],
      termsCond:['',Validators.required]
    })
  }
 
  fileUpload(event){
    this.images=event.target.files; 
    //this.fileError = false;
  }
  get s(){return this.supplierSignUpFormSecond.controls}
  get f(){return this.supplierSignUpForm.controls}
  signUp(){
    this.submit = true;
      if(this.supplierSignUpFormSecond.valid){
      $('.overlayDivLoader').show();
        let formData = new FormData();
        formData.append('business_name',this.supplierSignUpFormSecond.value.business_name);
        formData.append('personal_contact',this.supplierSignUpFormSecond.value.personal_contact);
        formData.append('contact_person',this.supplierSignUpFormSecond.value.contact_person);
        formData.append('business_address',this.supplierSignUpFormSecond.value.business_address);
        formData.append('email_id',this.supplierSignUpFormSecond.value.email_id);
        formData.append('business_abn',this.supplierSignUpFormSecond.value.business_abn);
        formData.append('business_type',this.supplierSignUpFormSecond.value.business_type);
        formData.append('suburbs',this.supplierSignUpFormSecond.value.suburbs);
        formData.append('postcode',this.supplierSignUpFormSecond.value.postcode);
        formData.append('state',this.supplierSignUpFormSecond.value.state);
        formData.append('password','123456');
        formData.append('user_role','4');
        this._signupSupplierService.signUp(formData).subscribe(res=>{
        $('.overlayDivLoader').hide();
          if(res == 'success'){
          this.toastr.successToastr('Registration SuccessFully');
          this.router.navigate(['/supplier-dash']);
          }else{
            this.toastr.errorToastr('Failed Registration');
          }
        })
           
      }
  }

}
