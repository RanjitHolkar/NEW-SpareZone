import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {AdminSettingService} from '../admin-setting.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {environment} from '../../../../environments/environment';
import {AuthenticationService} from '../../../services/authentication.service';
declare var $;
@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css']
})
export class ProfileSettingComponent implements OnInit {
  public profileForm: FormGroup;
  isProfileSubmitted = false;
  adminProfileLogo : any;
  adminProfileLogoURL : any;
  userProfileDetails :any;
  allStates : any;
  constructor(private formBuilder: FormBuilder,private AdminService:AdminSettingService,private toastr:ToastrManager,private commonService:AuthenticationService) { }
  ngOnInit() {
    this.createFormGroup();
    this.getStates();
  }
  /* get admin profile details */
  getAdminProfileDetails(){
    $('.overlayDivLoader').show();
    this.AdminService.getUserPrfole().subscribe((response:any)=>{
      $('.overlayDivLoader').hide();
    console.log(response);
      this.userProfileDetails=response.res;
      this.setValues();
       if(this.userProfileDetails.res){
        for(let key in this.userProfileDetails.res){
          console.log(key);
          console.log(this.profileForm.controls[key]);
          if(typeof this.profileForm.controls[key] != 'undefined'){
            console.log('asa');
            this.profileForm.controls['first_name'].setValue(response.res.key);
          }
        }
      }
    })
  }

  /* Get All States */
  getStates(){
    this.commonService.getAllStates().subscribe((result:any)=>{
      this.allStates = result.states;
      console.log(result);
    })
  }

  setValues(){
    this.profileForm.controls['business_name'].setValue(this.userProfileDetails.business_name);
    this.profileForm.controls['first_name'].setValue(this.userProfileDetails.first_name);
    this.profileForm.controls['last_name'].setValue(this.userProfileDetails.last_name);
    this.profileForm.controls['company_name'].setValue(this.userProfileDetails.company_name);
    this.profileForm.controls['mobile_number'].setValue(this.userProfileDetails.mobile_number);
    this.profileForm.controls['phone_number'].setValue(this.userProfileDetails.phone_number);
    this.profileForm.controls['abn'].setValue(this.userProfileDetails.abn);
    this.profileForm.controls['support_email'].setValue(this.userProfileDetails.support_email);
    this.profileForm.controls['sales_email'].setValue(this.userProfileDetails.sales_email);
    this.profileForm.controls['email_id'].setValue(this.userProfileDetails.email_id);
    this.profileForm.controls['address'].setValue(this.userProfileDetails.address);
    this.profileForm.controls['profile_logo'].setValue(this.userProfileDetails.profile_logo);
    this.profileForm.controls['added_by'].setValue(this.userProfileDetails.added_by);
    this.profileForm.controls['suburbs'].setValue(this.userProfileDetails.suburbs);
    this.profileForm.controls['state'].setValue(this.userProfileDetails.state);
    this.profileForm.controls['postcode'].setValue(this.userProfileDetails.postcode);
    this.profileForm.controls['modified_by'].setValue(this.userProfileDetails.modified_by);
    if(this.userProfileDetails.profile_logo)
      this.adminProfileLogoURL=environment.base_url+this.userProfileDetails.profile_logo;
    else
    this.adminProfileLogoURL='/assets/images/biglogo copy.png';
  }
  /* Create profile setting form group */
  createFormGroup(){
    
    this.profileForm = this.formBuilder.group({
      business_name: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      company_name: ['', Validators.required],
      mobile_number: ['', Validators.compose([Validators.required,Validators.pattern(/^\+?\d{4}[- ]?\d{3}[- ]?\d{3}$/)])],
      phone_number: ['', Validators.compose([Validators.required,Validators.pattern(/^\+?\d{2}[- ]?\d{4}[- ]?\d{4}$/)])],
      abn: ['', Validators.required],
      support_email: ['', Validators.compose([Validators.required,Validators.email])],
      sales_email: ['', Validators.compose([Validators.required,Validators.email])],
      email_id: ['', Validators.compose([Validators.required,Validators.email])],
      address: ['', Validators.required],
      profile_logo: [''],
      added_by: ['', Validators.required],
      modified_by: ['', Validators.required],
      suburbs: ['', Validators.required],
      state: ['', Validators.required],
      postcode: ['', Validators.required]
    })
    this.getAdminProfileDetails();
  }
  // return controle
  get profileF(){
    return this.profileForm.controls
  }

  /* Profile image preview */
  profileImagePreview(event){ 
    if (event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.adminProfileLogoURL=e.target.result;
        }       
        reader.readAsDataURL(event.target.files[0]);
        this.adminProfileLogo=event.target.files[0];
      }
  }
  /* Update Admin Profile Setting */
  updateProfileSetting(){
    this.isProfileSubmitted = true;
    if(this.profileForm.valid){
      $('.overlayDivLoader').show();
      this.isProfileSubmitted = false;
      const formData = new FormData();
      formData.append('business_name',this.profileForm.value.business_name);
      formData.append('first_name',this.profileForm.value.first_name);
      formData.append('last_name',this.profileForm.value.last_name);
      formData.append('company_name',this.profileForm.value.company_name);
      formData.append('mobile_number',this.profileForm.value.mobile_number);
      formData.append('phone_number',this.profileForm.value.phone_number);
      formData.append('abn',this.profileForm.value.abn);
      formData.append('support_email',this.profileForm.value.support_email);
      formData.append('sales_email',this.profileForm.value.sales_email);
      formData.append('address',this.profileForm.value.address);
      if(!!this.adminProfileLogo)
        formData.append('profile_logo',this.adminProfileLogo);
      formData.append('added_by',this.profileForm.value.added_by);
      formData.append('modified_by',this.profileForm.value.modified_by);
      formData.append('suburbs',this.profileForm.value.suburbs);
      formData.append('state',this.profileForm.value.state);
      formData.append('postcode',this.profileForm.value.postcode);
      this.AdminService.updateAdminProfile(formData).subscribe((response:any) => {
      $('.overlayDivLoader').hide();
        if(response.Msg == 'This Filed Is Not Empty')
          this.toastr.errorToastr('Some fields are missing', 'Oops!');
        else if(response.res == 'error')
          this.toastr.errorToastr(response.msg, 'Oops!');
        else if(response.res == 'success')
          this.toastr.successToastr(response.msg, 'Success!');        
      },error=>{
        console.log(error)
      })
    }else{
      return false;
    }
  }
}
