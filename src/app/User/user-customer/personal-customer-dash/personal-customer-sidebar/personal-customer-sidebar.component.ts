import { Component, OnInit } from '@angular/core';
import { CustomerDashComponent } from '../customer-dash.component';
import { CustomerDashService } from '../customer-dash.service';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-personal-customer-sidebar',
  templateUrl: './personal-customer-sidebar.component.html',
  styleUrls: ['./personal-customer-sidebar.component.css']
})
export class PersonalCustomerSidebarComponent implements OnInit {
public userDetails:any;
  constructor(private CustomerDashComponent:CustomerDashComponent,
              private _customerDashService:CustomerDashService) { }

  ngOnInit() {
    this._customerDashService.getUserDetails().subscribe(result=>{
      console.log(result);
      this.userDetails = result.res;
      this.userDetails.profile_logo = environment.base_url + this.userDetails.profile_logo;
    });
    
  }


}
