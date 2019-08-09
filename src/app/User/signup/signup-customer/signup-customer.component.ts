import { Component, OnInit } from '@angular/core';
import { Form,FormBuilder,FormArray,FormControl,FormGroup,Validators} from '@angular/forms';
import { SignupCustomerService } from './signup-customer.service';
import { HomeService } from '../../../home/home.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

declare var $;
@Component({
  selector: 'app-signup-customer',
  templateUrl: './signup-customer.component.html',
  styleUrls: ['./signup-customer.component.css']
})
export class SignupCustomerComponent implements OnInit {
  bannerImageChangedEvent: any = '';
  bannerCroppedImage: any = '';
  public businessForm:FormGroup; 
  public SignInFormFirst:FormGroup;
  public SignInFormSecond:FormGroup;
  public submitFirst = false;
  public submitSecond = false;
  public secondForm = false;
  public thirdForm = false;
  public SignInFormThird = false;
  public businesFormSubmit = false;
  public images :any;
  public fileError = false;
  public account_type = 1;
  public memberId:any;
  public customerSucess = false;
  public businessType:any;
  public imagesUrl:any;
  public userSearchData:any;
  public userData:any;
  bannerImgHeight: number;
bannerImgWidth: number;
  businessTypes :any;
    constructor(private formBuilder:FormBuilder,
      private SignupCustomerService :SignupCustomerService,
      private router: Router,
      private _homeService:HomeService,
      private toastr:ToastrManager,private commonService:AuthenticationService,private toaster :ToastrManager) { }
    ngOnInit() {
      $('.overlayDivLoader').show();
      this.SignupCustomerService.getBusinessType().subscribe(res=>{
        this.businessType = res['businessTypeData'];
      $('.overlayDivLoader').hide();
      })
      this.SignInFormFirst = this.formBuilder.group({
        account_type :[this.account_type],
        email_id : ['',[Validators.email,Validators.required]],
        password : ['',Validators.required]
      })
      this.SignInFormSecond = this.formBuilder.group({
        user_name  : ['',Validators.required],
        first_name : ['',Validators.required],
        last_name  : ['',Validators.required],
        business_address : ['',Validators.required],
        personal_contact : ['', Validators.compose([Validators.required,Validators.pattern(/^\+?\d{2}[- ]?\d{4}[- ]?\d{4}$/)])]
      })
      // FormBuilder In Signup second form in bussiness
      this.businessForm = this.formBuilder.group({
        business_name :['',Validators.required],
        contact_person :['',Validators.required],
        personal_contact :['', Validators.compose([Validators.required,Validators.pattern(/^\+?\d{2}[- ]?\d{4}[- ]?\d{4}$/)])],
        email_id :['',Validators.required],
        password :['',Validators.required],
        business_address :['',Validators.required],
        business_contact :['', Validators.compose([Validators.required,Validators.pattern(/^\+?\d{2}[- ]?\d{4}[- ]?\d{4}$/)])],
        business_abn :['',Validators.required],
        business_type :['',Validators.required],
        profile_logo :['',Validators.required],
        termsCond :['',Validators.required]
      })

      this.getBusinessType();
    }

    bannerFileChangeEvent(event: any) {
      if (event.target.files[0]) {
      var BannerImgSize = event.target.files[0].size;
      var maxSize = 15000;
      if (BannerImgSize > maxSize) {
      this.bannerImageChangedEvent = event;
      } else {
      this.toaster.errorToastr("Choose better quality image (Minimum 150 kb)", "Try Again")
      }
      } else {
      this.bannerImageChangedEvent = null;
      }
      }
      
      bannerImageCropped(event: ImageCroppedEvent) {
      this.bannerCroppedImage = event.base64;
      var thisvar = this;
      var i = new Image();
      i.onload = function () {
      thisvar.bannerImgHeight = i.height;
      thisvar.bannerImgWidth = i.width;
      };
      i.src = event.base64;
      
      }
    getBusinessType(){
      this.commonService.getAllBusinessTypes().subscribe((result:any)=>{
        this.businessTypes = result.businessTypeData;
        console.log(result);
      })
    }
    //Submit First Form Sign up
    signUpFirstFormSubmit(){
      this.submitFirst = true;
        if(this.SignInFormFirst.valid){
          this.SignInFormFirst.disable();
          this.secondForm = true; 
        }
        return false;
    }
  
    signUpSecondFormSubmit(){
      this.submitSecond = true;
      if(this.SignInFormSecond.valid){
        this.SignInFormSecond.disable();
        this.thirdForm = true;
      }
        return false;
    }
    get first(){return this.SignInFormFirst.controls}
    get second(){return this.SignInFormSecond.controls}
    //This Function For get Upload Files
    fileUpload(event){
      if (event.target.files && event.target.files[0]) {
        this.images = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.imagesUrl = reader.result;
        reader.readAsDataURL(this.images);
      }
      this.fileError = false;
    }
    

    accountType(type){
       this.SignInFormFirst.reset();
       this.SignInFormFirst.controls['account_type'].setValue(type);
       this.submitFirst = false;
    }
    signup(){
      if(this.images =='' || this.images == undefined){
        this.fileError = true;
        return false;
      }
        let formData = new FormData();
        formData.append('account_type',this.SignInFormFirst.value.account_type);
        formData.append('email_id',this.SignInFormFirst.value.email_id);
        formData.append('password',this.SignInFormFirst.value.password);
        formData.append('user_name',this.SignInFormSecond.value.user_name);
        formData.append('first_name',this.SignInFormSecond.value.first_name);
        formData.append('last_name',this.SignInFormSecond.value.last_name);
        formData.append('business_address',this.SignInFormSecond.value.business_address);
        formData.append('personal_contact',this.SignInFormSecond.value.personal_contact);
        formData.append('profile_logo',this.images);
        formData.append('user_role','8');
        this.signUpmain(formData);
    }

    // All Functions is Business customer Sign Up
   
    get businessForms(){return this.businessForm.controls}
    singUpBusines(){
      this.businesFormSubmit = true;
        if(this.businessForm.valid){
          $('.overlayDivLoader').show();
          let formData = new FormData();
          formData.append('account_type',this.SignInFormFirst.value.account_type);
          formData.append('email_id',this.businessForm.value.email_id);
          formData.append('password',this.businessForm.value.password);
          formData.append('business_name',this.businessForm.value.business_name);
          formData.append('business_address',this.businessForm.value.business_address);
          formData.append('personal_contact',this.businessForm.value.personal_contact);
          formData.append('business_contact',this.businessForm.value.business_contact);
          formData.append('contact_person',this.businessForm.value.contact_person);
          formData.append('business_abn',this.businessForm.value.business_abn);
          formData.append('business_type',this.businessForm.value.business_type);
          formData.append('profile_logo',this.images);
          formData.append('user_role','9');
          this.SignupCustomerService.signupCustomer(formData).subscribe(res=>{
            if(res.success == 1){
              localStorage.setItem('currentUser',JSON.stringify(res));
              this.userSearchData = JSON.parse(localStorage.getItem('userSearchData'));
              if(this.userSearchData){
                this.userData = JSON.parse(localStorage.getItem('currentUser'));
                this.userSearchData['user_status'] = this.userData.user_table_status;
                this.userSearchData['user_id'] = this.userData.login_user_id;
                this._homeService.saveSearchData(this.userSearchData).subscribe(res=>{
                  console.log(res);
                  localStorage.removeItem('userSearchData');
                })
              }
              this.router.navigate(['/login']);
            }else{
              this.toastr.errorToastr(res.msg);
            }
           
            $('.overlayDivLoader').hide();

            
            
          })    
          
        }  
    }
    signUpmain(alldata){
       $('.overlayDivLoader').show();
      this.SignupCustomerService.signupCustomer(alldata).subscribe(res=>{
        if(res.memberId){
          localStorage.setItem('currentUser',JSON.stringify(res));
          this.customerSucess = true;
          this.userSearchData = JSON.parse(localStorage.getItem('userSearchData'));
          if(this.userSearchData){
            this.userData = JSON.parse(localStorage.getItem('currentUser'));
            this.userSearchData['user_status'] = this.userData.user_table_status;
            this.userSearchData['user_id'] = this.userData.login_user_id;
            this._homeService.saveSearchData(this.userSearchData).subscribe(res=>{
              localStorage.removeItem('userSearchData');
            })
          }
          this.memberId = res.memberId;
          $('.overlayDivLoader').hide();
          console.log(res);
        }
      })    
    }

}
