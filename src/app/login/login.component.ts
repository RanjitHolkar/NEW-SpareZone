import { Component, OnInit } from '@angular/core';
import { Form,FormBuilder,FormArray,FormControl,FormGroup,Validators} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public loginForm : FormGroup;
public submit = false;
public data:any;
  constructor(
    private formBuilder:FormBuilder,
    private _authenticationService:AuthenticationService,
    private toastr:ToastrManager,
    private router:Router
    ) { }

  ngOnInit() {
    this.checkLogin();
    this.loginForm = this.formBuilder.group({
      email_id :['',Validators.required],
      password :['',Validators.required]
    })
  }
  // check Login Deatils
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

  // return controle
  get f(){
    return this.loginForm.controls
  }

  // check Login User Or Not
  checkLogin(){
    if(localStorage.getItem('currentUser')){
      this.data = JSON.parse(localStorage.getItem('currentUser'));
      if(this.data.userRole == 'Supplier')
        this.router.navigate(['/supplier-dash']);
      if(this.data.userRole == 'Admin')
        this.router.navigate(['/admin-activity']);
      if(this.data.userRole == 'Business Customer')
        this.router.navigate(['/business-customer-dash']);
      if(this.data.userRole == 'Personal Customer')
        this.router.navigate(['/personal-customer-dash']);
        // this.router.navigate(['/customer-business-dash']);
     // this.router.navigate(['/admin-setting']);
    }else{
      return false;
    }
  }


}
