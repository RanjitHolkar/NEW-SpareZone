import { Component, OnInit, ɵConsole } from '@angular/core';
import { Form, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../../../home/home.service';
import { CustomerDashService } from './customer-dash.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../../environments/environment';
declare var $;
@Component({
  selector: 'app-customer-dash',
  templateUrl: './customer-dash.component.html',
  styleUrls: ['./customer-dash.component.css']
})
export class CustomerDashComponent implements OnInit {
  public Base_url = environment.base_url;
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
  public userData:any;
  public allCarDetails:any;
  public carDetails:any;
  public sidebar=false;
  public car_profile_parts_id:any;
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
    this.getCarProfileList();
  }
  /* Get Car Profile List */
  getCarProfileList(){
    this.userData = JSON.parse(localStorage.getItem('currentUser'));
    this._customerDashService.getCarProfileList(this.userData.userData.login_user_id).subscribe(res=>{
      this.allCarDetails = res.carList;
      console.log(res);
    })
  }

  /* Display Car Details*/
  displayCarDetails(event){
    this.carDetails = this.allCarDetails[event.target.value];
    console.log(this.carDetails);
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
    this.groupImages[index]=this.images;
    console.log(this.groupImages);
  }

  SavePartsImages(){
    if(this.groupsData.length == 0){
      this.submit = true;
      return false;
    }
     $('.overlayDivLoader').show();
    var formData = new FormData();
    if(this.groupImages.length !=0){
      for(var i=0;i < this.groupImages.length; i++){
        console.log(this.groupImages[i]); 
        formData.append("partImage"+i,this.groupImages[i]);
      }
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
    this.userSearchData = Object.assign(this.FirstForm.value,this.ThirdForm.value);
    this.userSearchData['user_status'] = this.userData.userData.user_table_status;
    this.userSearchData['user_id'] = this.userData.userData.login_user_id;
      
    this._homeService.saveSearchData(this.userSearchData).subscribe(res=>{
      console.log(res);
      if(res.status !=0){
        this.toastr.successToastr(res.message);
      }else{
        this.toastr.errorToastr(res.message);
      }
      this.FirstForm.enable();
        this.SecondForm.enable();
        this.ThirdForm.enable();
        this.exhost=[];
        this.ngOnInit();
    })
  }
  // // check Login User Or Not
  // checkLogin(){
  //   if(localStorage.getItem('currentUser')){
  //     this.data = JSON.parse(localStorage.getItem('currentUser'));
  //     this.userSearchData['user_status'] = this.data.user_table_status;
  //     this.userSearchData['user_id'] = this.data.login_user_id;
  //     this._homeService.saveSearchData(this.userSearchData).subscribe(res=>{
  //       localStorage.removeItem('userSearchData');
  //     })
  //     if(this.data.userRole == 'Supplier')
  //       this.router.navigate(['/supplier-dash']);
  //     if(this.data.userRole == 'Admin')
  //       this.router.navigate(['/admin-activity']);
  //     if(this.data.userRole == 'Business Customer')
  //       this.router.navigate(['/business-customer-dash']);
  //     if(this.data.userRole == 'Personal Customer')
  //       this.router.navigate(['/personal-customer-dash']);
  //   }else{
  //     return false;
  //   }
  // }
  // // searchAgain(){
  // //   if(this.router.url == '/'){
  // //     this.router.navigate(['/home']);
  // //   }else{
  // //     this.router.navigate(['/']);
  // //   }
  // // }
  // // setData(){
  // //   this.userSearchData = Object.assign(this.FirstForm.value, this.SecondForm.value,this.ThirdForm.value);
  // //   this.userSearchData['looking_for_part'] = JSON.stringify(this.exhost);
  // //     localStorage.setItem('userSearchData',JSON.stringify(this.userSearchData));
  // // }
  searchAgain(){
    this.FirstForm.enable();
    this.SecondForm.enable();
    this.ThirdForm.enable();
    this.exhost=[];
    this.ngOnInit();
  }

  hideShowSlider(value){
    this.sidebar = value;

  }

}
