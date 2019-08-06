import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from './home.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { JsonPipe } from '@angular/common';
declare var $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public secondForm = false;
public thirdForm = false;
public successForm = false;
public firstForm = true;
public makesDetails:any;
public yearDetails:any;
public modelDetails:any;
public FirstForm:FormGroup;
public SecondForm:FormGroup;
public ThirdForm:FormGroup;
public loginForm:FormGroup;
public submit = false;
public looking_for_part:FormArray;
public bodyType:any;
public engineType:any;
public transmissionType:any;
public LoginForm = false;
public data:any;
public userSearchData :any;
  constructor(private fb:FormBuilder,private _homeService:HomeService,
    private _authenticationService:AuthenticationService,
    private router:Router,
    private toastr:ToastrManager) { }

  ngOnInit() {
    localStorage.removeItem('userSearchData');
    this._homeService.getMakes().subscribe(res=>{
      this.makesDetails = res.result;
    })
    this.FirstForm = this.fb.group({
      car_make_id:['',Validators.required],
      car_model_id:['',Validators.required],
      car_year_id:['',Validators.required]
    })
    this.SecondForm = this.fb.group({
      looking_for_part:this.fb.array([this.addForm()])
    })
    this.ThirdForm = this.fb.group({
      car_engine_type_id:['',Validators.required],
      car_transmission_type_id:['',Validators.required],
      car_body_type_id:['',Validators.required],
      note:['',Validators.required]
    })
    this.loginForm = this.fb.group({
      email_id :['',Validators.required],
      password :['',Validators.required]
    })
    this.getYear();
  }
  getModel(event){
    if(event.target.value !=''){
      $('.overlayDivLoader').show();
      this._homeService.getModel(event.target.value).subscribe(res=>{
        this.modelDetails = res.result;
        $('.overlayDivLoader').hide();
      })
    }
  }
  getYear(){
    $('.overlayDivLoader').show();
    this._homeService.getYear().subscribe(res=>{
      this.yearDetails = res.result;
    $('.overlayDivLoader').hide();
    })
  }
  get f(){return this.FirstForm.controls}
  get s(){return this.SecondForm.controls}
  get t(){return this.ThirdForm.controls}
  get l(){return this.loginForm.controls}
  submitFirstForm(){
    this.submit = true;
    if(this.FirstForm.valid){
      this.secondForm = true;
      this.submit = false;
      this.FirstForm.disable();
    }
  }
  addExahost(){
    let control = <FormArray>this.SecondForm.controls['looking_for_part'];
    control.push(this.addForm());
  }
  removeExahost(index){
    let control = <FormArray>this.SecondForm.controls['looking_for_part'];
    control.removeAt(index);
  }
  addForm(){
    return this.fb.group({
      exhaust:['',Validators.required]
    })
  }
  SubmitsecondForm(){
    this.submit = true;
   if(this.SecondForm.valid){
    this.submit = false;
     this.thirdForm = true;
     this.SecondForm.disable();
     this.getBodyType();
     this.getEngineType();
     this.getTransmissionType();
   }
  }
  getBodyType(){
    $('.overlayDivLoader').show();
    this._homeService.getBodyType().subscribe(res=>{
      this.bodyType = res.Data;
    $('.overlayDivLoader').hide();

    })
  }
  clickEvent(value){
    this.ThirdForm.patchValue({
      car_body_type_id:value
    });
  }
  getEngineType(){
    $('.overlayDivLoader').show();
    this._homeService.getEngineType().subscribe(res=>{
      this.engineType = res.Data;
    $('.overlayDivLoader').hide();

    })
  }
  getTransmissionType(){
    $('.overlayDivLoader').show();
    this._homeService.getTransmissionType().subscribe(res=>{
      this.transmissionType = res.Data;
    $('.overlayDivLoader').hide();
    })
  }
  SubmitThirdForm(){
    this.submit = true;
    if(this.ThirdForm.valid){
      this.successForm= true;
      this.ThirdForm.disable();
    }
  }
  SubmitsuccessForm(){
    this.LoginForm = true;
    this.setData();
  }
  login(){
    this.submit = true;
    if(this.loginForm.valid){
      $('.overlayDivLoader').show();
      this._authenticationService.login(this.loginForm.value).subscribe(res=>{
        if(res =='success'){
          this.checkLogin();
        }else{
          this.toastr.errorToastr(res.message, 'Alert!');
        }
      },error=>{
          this.toastr.errorToastr(error, 'Oops!');
      })
      this.submit = false;
      $('.overlayDivLoader').hide();
    }
  }
  // check Login User Or Not
  checkLogin(){
    if(localStorage.getItem('currentUser')){
      this.data = JSON.parse(localStorage.getItem('currentUser'));
      this.userSearchData['user_status'] = this.data.user_table_status;
      this.userSearchData['user_id'] = this.data.login_user_id;
      this._homeService.saveSearchData(this.userSearchData).subscribe(res=>{
        localStorage.removeItem('userSearchData');
      })
      if(this.data.userRole == 'Supplier')
        this.router.navigate(['/supplier-dash']);
      if(this.data.userRole == 'Admin')
        this.router.navigate(['/admin-activity']);
      if(this.data.userRole == 'Business Customer')
        this.router.navigate(['/business-customer-dash']);
      if(this.data.userRole == 'Personal Customer')
        this.router.navigate(['/personal-customer-dash']);
    }else{
      return false;
    }
  }
  searchAgain(){
    if(this.router.url == '/'){
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['/']);
    }
  }
  setData(){
    this.userSearchData = Object.assign(this.FirstForm.value, this.SecondForm.value,this.ThirdForm.value);
    this.userSearchData['looking_for_part'] = JSON.stringify(this.SecondForm.value.looking_for_part);
      localStorage.setItem('userSearchData',JSON.stringify(this.userSearchData));
  }

}
