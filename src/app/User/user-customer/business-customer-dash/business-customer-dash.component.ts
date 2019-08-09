import { Component, OnInit } from '@angular/core';
import { AdminProfileService } from '../../../Admin/admin-profile/admin-profile.service';
import {environment} from '../../../../environments/environment';
declare var $:any;
@Component({
  selector: 'app-business-customer-dash',
  templateUrl: './business-customer-dash.component.html',
  styleUrls: ['./business-customer-dash.component.css']
})
export class BusinessCustomerDashComponent implements OnInit {
  userDetails : any;
  constructor(private adminProfileService:AdminProfileService) { }

  ngOnInit() {
    $('.overlayDivLoader').show();
    this.userDetails =[];
    this.adminProfileService.getUserDetails().subscribe(result=>{
      this.userDetails = result.res;
      this.userDetails.profile_logo = environment.base_url + this.userDetails.profile_logo;
      console.log(this.userDetails);
      $('.overlayDivLoader').hide();
    })
  }

}
