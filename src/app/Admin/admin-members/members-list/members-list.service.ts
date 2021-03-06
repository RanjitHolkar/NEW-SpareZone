import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersListService {
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
}
