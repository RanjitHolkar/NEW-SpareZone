import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupSupplierService {
  public BaseUrl = environment.base_url;
  constructor(private httpClient:HttpClient) { }
  signUp(info:any){
    return this.httpClient.post<any>(this.BaseUrl +'User/userRegistration',info).pipe(map(res=>{
      console.log(res);
      if(res['token']){
        localStorage.setItem('currentUser',JSON.stringify(res));
        return 'success';
      }
      return 'error';
    }))
  }
  getBusinessType(){
    return this.httpClient.get<any>(this.BaseUrl +'Admin/BusinessType/getBusinessTypeList').pipe(map(res=>{
      return res;
    }))
  }
  getgroupType(){
    return this.httpClient.get<any>(this.BaseUrl +'Admin/Setting/getSupplierGroups').pipe(map(res=>{
      return res;
    }))
  }
}