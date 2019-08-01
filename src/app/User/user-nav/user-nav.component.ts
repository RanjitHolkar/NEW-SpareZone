import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {
public activestate:string;
  constructor(private authenticationService:AuthenticationService,private router:Router) { }

  ngOnInit() {
    this.activestate = this.router.url;
  }
  logout(){
    this.authenticationService.logout();
  }

}
