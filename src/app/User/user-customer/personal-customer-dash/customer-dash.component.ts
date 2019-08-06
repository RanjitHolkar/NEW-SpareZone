import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../../../home/home.service';
import { CustomerDashService } from './customer-dash.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $;
@Component({
  selector: 'app-customer-dash',
  templateUrl: './customer-dash.component.html',
  styleUrls: ['./customer-dash.component.css']
})
export class CustomerDashComponent implements OnInit {
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
  public userData:any;
  public userSearchData:any;
  constructor(private fb:FormBuilder,private _homeService:HomeService,
    private router:Router,
    private toastr:ToastrManager,
    private _customerDashService:CustomerDashService) { }

  ngOnInit() {
    this.secondForm = false;
    this.thirdForm = false;
    this.successForm = false;
    this.firstForm = true;
    this.submit = false;
    this.userSearchData='';

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
    this.getCarProfileList();
  }
  /* Get Car Profile List */
  getCarProfileList(){
    this.userData = JSON.parse(localStorage.getItem('currentUser'));
    this._customerDashService.getCarProfileList(this.userData.userData.login_user_id).subscribe(res=>{
      console.log(res);
    })
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
    this.userSearchData = Object.assign(this.FirstForm.value, this.SecondForm.value,this.ThirdForm.value);
    this.userSearchData['looking_for_part'] = JSON.stringify(this.SecondForm.value.looking_for_part);
    this.userSearchData['user_status'] = this.userData.userData.user_table_status;
    this.userSearchData['user_id'] = this.userData.userData.login_user_id;
    console.log(this.userSearchData);
    this._homeService.saveSearchData(this.userSearchData).subscribe(res=>{
      console.log(res);
    })
  }
  searchAgain(){
    this.FirstForm.enable();
    this.SecondForm.enable();
    this.ThirdForm.enable();
    this.ngOnInit();
  }

}
