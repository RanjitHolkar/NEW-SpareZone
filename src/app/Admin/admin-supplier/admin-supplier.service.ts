import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminSupplierService {
  public BaseUrl = environment.base_url;
  constructor(private httpClient:HttpClient) { }
  getGroups(){
    return this.httpClient.get<any>( this.BaseUrl + 'Admin/Setting/getSupplierGroups').pipe(map(res=>{
      return res;
    }))
  }
  getStates(){
    return this.httpClient.get<any>( this.BaseUrl + 'Supplier/getCommonSupplierStates').pipe(map(res=>{
      return res;
    }))
  }
  
  getSupplierListing(info:any){
    return this.httpClient.get<any>( this.BaseUrl + 'Supplier/getSupplierList/'+info).pipe(map(res=>{
      return res;
    }))
  }
  activeDeactiveSupplier(info:any){
    return this.httpClient.put<any>(this.BaseUrl +'Supplier/supplierUpdate/',info).pipe(map(res=>{
      return res;
    }))
  }
}
