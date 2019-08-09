import { Component, OnInit } from '@angular/core';
import { AdminProfileService } from './admin-profile.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment';
declare var $;
@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
public userDetails : any ;
  constructor(private adminProfileService:AdminProfileService,
    private authenticationService:AuthenticationService,
    private router:Router) { }

  ngOnInit() {
    this.userDetails =[];
    this.adminProfileService.getUserDetails().subscribe(result=>{
      this.userDetails = result.res;
      console.log(result);
      if(this.userDetails.profile_logo)
        this.userDetails.profile_logo = environment.base_url + this.userDetails.profile_logo;
      else
        this.userDetails.profile_logo = 'assets/images/biglogo copy.png';
    })
  }
  logout(){
    this.authenticationService.logout();
  }
}
