import { Component, OnInit } from '@angular/core';
import { AdminProfileService } from './admin-profile.service';
@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
public userDetails=[];
  constructor(private adminProfileService:AdminProfileService) { }

  ngOnInit() {
    this.userDetails =[];
    this.adminProfileService.getUserDetails().subscribe(res=>{
      this.userDetails.push(res.res);
    })
  }

}
