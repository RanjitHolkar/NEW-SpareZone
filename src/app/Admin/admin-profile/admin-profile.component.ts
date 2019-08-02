import { Component, OnInit } from '@angular/core';
import { AdminProfileService } from './admin-profile.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
public userDetails=[];
  constructor(private adminProfileService:AdminProfileService,
    private authenticationService:AuthenticationService,
    private router:Router) { }

  ngOnInit() {
    $('.overlayDivLoader').show(); 
    this.userDetails =[];
    this.adminProfileService.getUserDetails().subscribe(res=>{
      this.userDetails.push(res.res);
    $('.overlayDivLoader').hide();
    })
  }
  logout(){
    this.authenticationService.logout();
  }

}
