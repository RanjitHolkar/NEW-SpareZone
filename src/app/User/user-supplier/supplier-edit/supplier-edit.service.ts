import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SupplierEditService {
public BaseUrl = environment.base_url;
  constructor(private httpClient:HttpClient) { }
  getUserDetails(){
    return this.httpClient.get<any>(this.BaseUrl +'User/getUserDeatils').pipe(map(res=>{
      return res;
    }))
  }
  getBusinessType(){
    return this.httpClient.get<any>(this.BaseUrl +'Admin/BusinessType/getBusinessTypeList').pipe(map(res=>{
      return res;
    }))
  }
  updateDetails(info:any){
    return this.httpClient.post<any>(this.BaseUrl +'User/updateUser',info).pipe(map(res=>{
      return res;
    }))
  }
  addSubSupplier(info:any){
    return this.httpClient.post<any>(this.BaseUrl +'Sub_Supplier/saveSubSupplier',info).pipe(map(res=>{
      return res;
    }))
  }
  getSubSupplier(){
    return this.httpClient.get<any>(this.BaseUrl +'Sub_Supplier/getSubSupplier').pipe(map(res=>{
      return res;
    }))
  }
  updateSubSupplier(info:any){
    return this.httpClient.put<any>(this.BaseUrl +'Sub_Supplier/updateSubSupplier',info).pipe(map(res=>{
      return res;
    }))
  }
  deleteSubSupplier(info:any){
    return this.httpClient.put<any>(this.BaseUrl +'Sub_Supplier/deleteSubSupplier',info).pipe(map(res=>{
      return res;
    }))
  }
  getgroupType(){
    return this.httpClient.get<any>(this.BaseUrl +'Admin/Setting/getSupplierGroups').pipe(map(res=>{
      return res;
    }))
  }
  
}
