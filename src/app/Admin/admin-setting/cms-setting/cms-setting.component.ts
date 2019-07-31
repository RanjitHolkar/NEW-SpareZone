import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminSettingService } from '../admin-setting.service';
import {environment} from '../../../../environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-cms-setting',
  templateUrl: './cms-setting.component.html',
  styleUrls: ['./cms-setting.component.css']
})
export class CmsSettingComponent implements OnInit {
  cmsSettingData: any;
  public cmsSettingForm: FormGroup;
  isCMSSettingSubmitted = false;
  CMSSettingData: any;
  userLogoURL='/assets/images/biglogo copy.png'; supLogoURL='/assets/images/biglogo copy.png'; buyerLogoURL='/assets/images/biglogo copy.png';
  userLogoFile:any; supLogoFile:any; buyerLogoFile:any;
  constructor(private formBuilder: FormBuilder, private AdminService: AdminSettingService,private toastr:ToastrManager) { }

  ngOnInit() {
    this.createCMSSettingFrom();
    this.getCMSSettingData();    
  }
  /* SET CMS value */
  setCMSValue(){
    this.cmsSettingForm.controls['setting_id'].setValue(this.CMSSettingData.setting_id);
    this.cmsSettingForm.controls['facebook_link'].setValue(this.CMSSettingData.facebook_link);
    this.cmsSettingForm.controls['instagram_link'].setValue(this.CMSSettingData.instagram_link);
    this.cmsSettingForm.controls['twitter_link'].setValue(this.CMSSettingData.twitter_link);
    this.cmsSettingForm.controls['others'].setValue(this.CMSSettingData.others);
    if(this.CMSSettingData.user_avatar)
      this.userLogoURL=environment.base_url+this.CMSSettingData.user_avatar;
    if(this.CMSSettingData.sup_logo)
      this.supLogoURL=environment.base_url+this.CMSSettingData.sup_logo;
    if(this.CMSSettingData.buyar_logo)
      this.buyerLogoURL=environment.base_url+this.CMSSettingData.buyar_logo;
  }
  /* Get CMS setting data */
  getCMSSettingData() {
    this.AdminService.getCMSSetting().subscribe((response:any)=>{
      if(response.CMSSetting){
        this.CMSSettingData = response.CMSSetting;
      this.setCMSValue();
      }      
    })
  }

  /* Create CMS setting form */
  createCMSSettingFrom(){
      this.cmsSettingForm = this.formBuilder.group({
        setting_id: ['', Validators.required],
        facebook_link: ['', Validators.required],
        instagram_link: ['', Validators.required],
        twitter_link: ['', Validators.required],
        others: [''],
        user_avatar: [''],
        sup_logo: [''],
        buyar_logo: ['']
      })
  }

  get cmsSettingF(){
    return this.cmsSettingForm.controls
  }

  /* Profile image preview */
  profileUserImagePreview(event){ 
    if (event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.userLogoURL=e.target.result;
        }       
        reader.readAsDataURL(event.target.files[0]);
        this.userLogoFile=event.target.files[0];
      }
  }
   profileSupplierImagePreview(event){ 
    if (event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.supLogoURL=e.target.result;
        }       
        reader.readAsDataURL(event.target.files[0]);
        this.supLogoFile=event.target.files[0];
      }
  }
   profileBuyerImagePreview(event){ 
    if (event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.buyerLogoURL=e.target.result;
        }       
        reader.readAsDataURL(event.target.files[0]);
        this.buyerLogoFile=event.target.files[0];
      }
  }

  updateCMSSetting(){
    this.isCMSSettingSubmitted = true;
    console.log(this.cmsSettingForm.valid);
    if(this.cmsSettingForm.valid){
      this.isCMSSettingSubmitted = false;
      const formData = new FormData();
      formData.append('setting_id',this.cmsSettingForm.value.setting_id);
      formData.append('facebook_link',this.cmsSettingForm.value.facebook_link);
      formData.append('instagram_link',this.cmsSettingForm.value.instagram_link);
      formData.append('twitter_link',this.cmsSettingForm.value.twitter_link);
      formData.append('others',this.cmsSettingForm.value.others);
      if(!!this.userLogoFile)
        formData.append('user_avatar',this.userLogoFile);
      if(!!this.supLogoFile)
        formData.append('sup_logo',this.supLogoFile);
      if(!!this.buyerLogoURL)
        formData.append('buyar_logo',this.buyerLogoFile);
      this.AdminService.updateCMSSetting(formData).subscribe((response:any) => {
        console.log(response);
        if(!response.status)
          this.toastr.errorToastr(response.message, 'Oops!');
        else if(response.status)
          this.toastr.successToastr(response.message, 'Success!');
                  
      },error=>{
        console.log(error)
      })
    }else{
      return false;
    }
  }
}
