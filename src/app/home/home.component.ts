import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from './home.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../environments/environment';
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
public serachData={name:'Ranjit'};
public userSearchData :any;
public searchBox=false;
public partDetails:any;
public groupDetailsPopUp:any;
public groupDetails:any;
public groupsData=[];
public groupImages=[];
public part_id:any;
public exhost=[];
public part_name:any;
public imagesUrl=[];
public images:any;
public base_url=environment.base_url;
public car_profile_parts_id:any;
  constructor(private fb:FormBuilder,private _homeService:HomeService,
    private _authenticationService:AuthenticationService,
    private router:Router,
    private toastr:ToastrManager) { }

  ngOnInit() {
    this.groupDetailsPopUp = false;
    localStorage.removeItem('userSearchData');
    this._homeService.getMakes().subscribe(res=>{
      this.makesDetails = res.result;
    })
    this.FirstForm = this.fb.group({
      car_make_id:['',Validators.required],
      car_model_id:['',Validators.required],
      car_year_id:['',Validators.required],
      plate_number:['',Validators.required]
    })
    this.SecondForm = this.fb.group({
      exhaust:[''],
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
  SubmitsecondForm(){
      this.submit = false;
      this.thirdForm = true;
      this.SecondForm.disable();
      this.getBodyType();
      this.getEngineType();
      this.getTransmissionType();
  }
  getBodyType(){
    $('.overlayDivLoader').show();
    this._homeService.getBodyType().subscribe(res=>{
      this.bodyType = res.Data;
    $('.overlayDivLoader').hide();
    })
  }
  /* Add Exahost function: Start */
  displayGroup(part_name,part_id){
    if(part_name !=''){
      this.SecondForm.patchValue({
        exhaust:part_name
      })
    }
    this.part_id = part_id;
    $('.overlayDivLoader').show();
    this._homeService.getGroups().subscribe(res=>{
      this.groupDetails = res.supplierGroups;
      console.log(res);
      $('.overlayDivLoader').hide();
    })
    this.groupDetailsPopUp = true;
  }
  removeElement(index,car_part_id){
    $('.overlayDivLoader').show();
    this._homeService.deleteParts({car_profile_parts_id:car_part_id,is_delete:1}).subscribe(res=>{
      this.exhost.splice(index, 1);
      $('.overlayDivLoader').hide();
    })
    
  }
  searchParts(event){
    $('.overlayDivLoader').show();
    this._homeService.getParts(event.target.value).subscribe(res=>{
      this.partDetails = res.parts;
      $('.overlayDivLoader').hide();
    })
    this.searchBox = true;
  }
  addGroups(group_id,group_color,event){
    if(event.target.checked == true){
      this.groupsData.push({'group_id':group_id,'group_color':group_color});
    }else{
      for(let i=0;i<this.groupsData.length;i++){
        if(this.groupsData[i].group_id == group_id){
            this.groupsData.splice(i, 1);
        }
      }
    }
  }
  partsImages(index,event){
    if (event.target.files && event.target.files[0]) {
      this.images = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imagesUrl[index] = reader.result;
      reader.readAsDataURL(this.images);
    }
    this.groupImages.push(this.images);
    console.log(event.target.files[0]);
  }

  SavePartsImages(){
    if(this.groupsData.length == 0){
      this.submit = true;
      return false;
    }
     $('.overlayDivLoader').show();
    console.log(this.groupImages);
    var formData = new FormData();
     for(var i=0;i < this.groupImages.length; i++){
       console.log(this.groupImages[i]); 
       formData.append("partImage"+i,this.groupImages[i]);
     }
     formData.append('group_id',JSON.stringify(this.groupsData));
     formData.append('part_id',this.part_id);
     formData.append('new_part_name',this.SecondForm.value.exhaust);
     this._homeService.saveParts(formData).subscribe(res=>{
       this.car_profile_parts_id = res;
       $('.overlayDivLoader').hide();
      if(this.car_profile_parts_id != undefined){
        let data = {'group_id':this.groupsData,'part_id':this.part_id,'part_name':this.SecondForm.value.exhaust,'car_profile_parts_id':this.car_profile_parts_id}
        this.exhost.push(data);
        this.searchBox = false;
        this.submit = false;
        this.groupDetailsPopUp = false;
        this.SecondForm.reset();
        this.groupsData=[];
        this.groupImages=[];
        this.imagesUrl=[];
      }
    })
    
  }
  /*  Add Exahost function: Stop */
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
    this.submit = false;
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
      this.userSearchData['user_status'] = this.data.userData.user_table_status;
      this.userSearchData['user_id'] = this.data.userData.login_user_id;
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
    this.userSearchData = Object.assign(this.FirstForm.value,this.ThirdForm.value);
      localStorage.setItem('userSearchData',JSON.stringify(this.userSearchData));
  }

}
