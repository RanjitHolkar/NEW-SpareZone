import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupCustomerService {
public BaseUrl = environment.base_url;
  constructor(private httpClient:HttpClient) { }
  signupCustomer(info:any){
    return this.httpClient.post<any>(this.BaseUrl +'User/userRegistration',info).pipe(map(res=>{
      return res;
    }))
  }
  getBusinessType(){
    return this.httpClient.get<any>(this.BaseUrl +'Admin/BusinessType/getBusinessTypeList').pipe(map(res=>{
      return res;
    }))
  }
}
