import { Component, OnInit } from '@angular/core';
import { Form,FormBuilder,FormArray,FormControl,FormGroup,Validators} from '@angular/forms';
import { SignupCustomerService } from './signup-customer.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-signup-customer',
  templateUrl: './signup-customer.component.html',
  styleUrls: ['./signup-customer.component.css']
})
export class SignupCustomerComponent implements OnInit {
  public signUpFormSecondBussiness:FormGroup; 
  public signUpFormThirdBussiness:FormGroup; 
  public SignInFormFirst:FormGroup;
  public SignInFormSecond:FormGroup;
  public submitFirst = false;
  public submitSecond = false;
  public secondForm = false;
  public secondFormBussiness = false;
  public thirdForm = false;
  public SignInFormThird = false;
  public firstFormBusines = false;
  public images :any;
  public fileError = false;
  public thirdFormBussiness = false;
  public account_type = 1;
  public secondFormBusines = false;
  public memberId:any;
  public customerSucess = false;
  public bussinessSucess = false;
  public businessType:any;
  public imagesUrl:any;
    constructor(private formBuilder:FormBuilder,private SignupCustomerService :SignupCustomerService,private router: Router) { }
    ngOnInit() {
      this.SignupCustomerService.getBusinessType().subscribe(res=>{
        this.businessType = res['businessTypeData'];
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
        personal_contact : ['',Validators.required]
      })
      // FormBuilder In Signup second form in bussiness
      this.signUpFormSecondBussiness = this.formBuilder.group({
        business_name :['',Validators.required],
        personal_contact :['',Validators.required],
        business_contact :['',Validators.required],
        business_address :['',Validators.required],
        contact_person :['',Validators.required]
      })
      this.signUpFormThirdBussiness = this.formBuilder.group({
        business_abn :['',Validators.required],
        business_type :['',Validators.required],
        profile_logo :['',Validators.required]
      })
    }
    
    //Submit First Form Sign up
    signUpFirstFormSubmit(){
      this.submitFirst = true;
        if(this.SignInFormFirst.valid){
          this.SignInFormFirst.disable();
          if(this.SignInFormFirst.value.account_type == 2){
            this.secondFormBussiness = true;
          }else{
            this.secondForm = true;
          }
          
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
    get bFirst(){return this.signUpFormSecondBussiness.controls}
    get bSecond(){return this.signUpFormThirdBussiness.controls}
    signUpFirstFormBusinesSubmit(){
      console.log(this.signUpFormSecondBussiness.value.business_name);
      this.firstFormBusines = true;
      if(this.signUpFormSecondBussiness.valid){
        this.signUpFormSecondBussiness.disable();
        this.thirdFormBussiness = true;
      }
    }
   
    singUpBusines(){
      this.secondFormBusines = true;
        if(this.signUpFormThirdBussiness.valid){
          let formData = new FormData();
          formData.append('account_type',this.SignInFormFirst.value.account_type);
          formData.append('email_id',this.SignInFormFirst.value.email_id);
          formData.append('password',this.SignInFormFirst.value.password);
          formData.append('business_name',this.signUpFormSecondBussiness.value.business_name);
          formData.append('business_address',this.signUpFormSecondBussiness.value.business_address);
          formData.append('personal_contact',this.signUpFormSecondBussiness.value.personal_contact);
          formData.append('business_contact',this.signUpFormSecondBussiness.value.business_contact);
          formData.append('contact_person',this.signUpFormSecondBussiness.value.contact_person);
          formData.append('business_abn',this.signUpFormThirdBussiness.value.business_abn);
          formData.append('business_type',this.signUpFormThirdBussiness.value.business_type);
          formData.append('profile_logo',this.images);
          formData.append('user_role','9');
          this.signUpmain(formData);
        }
        
    }
    signUpmain(alldata){
      // $('#overlayDivLoader').css('display','block');
      // console.log(alldata);
      this.SignupCustomerService.signupCustomer(alldata).subscribe(res=>{
        if(res.memberId){
          this.customerSucess = this.SignInFormFirst.value.account_type;
          this.memberId = res.memberId;
          console.log(this.memberId);
        }
      })    
    }

}
