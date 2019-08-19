import { Component, OnInit } from '@angular/core';
import { AdminProfileService } from '../../../Admin/admin-profile/admin-profile.service';
import { environment} from '../../../../environments/environment';
import { HomeService } from '../../../home/home.service';
import { BusinessCustomerDashService } from './business-customer-dash.service';
import { FormGroup,FormArray,FormBuilder,FormControl, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

declare var $:any;
@Component({
  selector: 'app-business-customer-dash',
  templateUrl: './business-customer-dash.component.html',
  styleUrls: ['./business-customer-dash.component.css']
})
export class BusinessCustomerDashComponent implements OnInit {
  userDetails : any;
  secondForm = false;
  thirdForm = false;
  SecondForm:FormGroup;
  ThirdForm:FormGroup;
  FirstForm:FormGroup;
  submit = false;
  makesDetails : any;
  modelDetails : any;
  yearDetails : any;
  driveDetails : any;
  images : any;
  imagesUrl = [];
  groupImages = [];
  userSearchData :any;
  userData :any;
  constructor(private adminProfileService:AdminProfileService,
    private fb:FormBuilder,private _homeService:HomeService,
    private _businessCustomerDashService:BusinessCustomerDashService,
    private toastr:ToastrManager) { }

  ngOnInit() {
    this.secondForm = false;
    this.thirdForm = false;
    this._homeService.getMakes().subscribe(res=>{
      this.makesDetails = res.result;
    })
    this.FirstForm = this.fb.group({
      order_no :['',Validators.required],
      claim_no :['',Validators.required],
      vin_number :['',Validators.required],
      car_make_id :['',Validators.required],
      car_model_id :['',Validators.required],
      date_time:[1]
    })
    this.SecondForm = this.fb.group({
      car_year_id :['',Validators.required],
      car_series_id :['',Validators.required],
      looking_for_part :['',Validators.required],
      car_fuel_type_id :['',Validators.required],
      drive_train_id :['',Validators.required],
      // drive_train_id :['',Validators.required]
    })
    $('.overlayDivLoader').show();
    this.userDetails =[];
    this.adminProfileService.getUserDetails().subscribe(result=>{
      this.userDetails = result.res;
      this.userDetails.profile_logo = environment.base_url + this.userDetails.profile_logo;
      console.log(this.userDetails);
      $('.overlayDivLoader').hide();
    });
    
  }
  get f(){return this.FirstForm.controls}
  get s(){return this.SecondForm.controls}
  // Save Second Form 
  saveDetailsForm(){
    this.submit = true;
    if(this.SecondForm.valid){
      this.userData = JSON.parse(localStorage.getItem('currentUser'));
      this.userSearchData = Object.assign(this.FirstForm.value,this.SecondForm.value);
      this.userSearchData['user_status'] = this.userData.userData.user_table_status;
      this.userSearchData['user_id'] = this.userData.userData.login_user_id;
      console.log(this.userSearchData);
      this._homeService.saveSearchData(this.userSearchData).subscribe(res=>{
        console.log(res);
        this.submit = false;
        if(res.status !=0){
          this.toastr.successToastr(res.message);
        }else{
          this.toastr.errorToastr(res.message);
        }
        this.ngOnInit();
      }) 
    }
  }

  saveSecondForm(){
    this.submit = true;
    if(this.SecondForm.valid){
      this.submit = false;
      this.thirdForm = true;
    }
  }
  // Save Third Form 
  saveThirdForm(){
    alert('third');
  }
  // Save First Form

  saveFirstForm(){
    this.submit = true;
    if(this.FirstForm.valid){
      this.getDriveTrainDetails();
      this. getYear();
      this.submit = false;
      this.secondForm = true;
    }
  }

  /* Get Model List:Start */
  getModel(event){
    if(event.target.value !=''){
      $('.overlayDivLoader').show();
      this._homeService.getModel(event.target.value).subscribe(res=>{
        this.modelDetails = res.result;
        console.log(res);
        $('.overlayDivLoader').hide();
      })
    }
  }
  /* Get Model List:Stop */

  /*Get Year List:start*/
  getYear(){
    $('.overlayDivLoader').show();
    this._homeService.getYear().subscribe(res=>{
      this.yearDetails = res.result;
      console.log('year',this.yearDetails);
    $('.overlayDivLoader').hide();
    })
  }
  /*Get Year List:stop*/

  /* Get Drive Train Details:Start*/
  getDriveTrainDetails(){
    $('.overlayDivLoader').show();
    this._businessCustomerDashService.getDriveTrainDetails().subscribe(res=>{
      this.driveDetails = res.Data;
      console.log('drive',this.driveDetails);
    $('.overlayDivLoader').hide();
    })
  }
  /* Get Drive Train Details:End*/
  partsImages(index,event){
    if (event.target.files && event.target.files[0]) {
      this.images = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imagesUrl[index] = reader.result;
      reader.readAsDataURL(this.images);
    }
    this.groupImages[index]=this.images;
    console.log(this.groupImages);
  }


}
