import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SupplierPreferredListService {
  public loggedUserdata = JSON.parse(localStorage.getItem('currentUser'));
  public custId = this.loggedUserdata['userData']['login_user_id'];
  public limit: number = 1;
  public userdata = [];
  public BaseUrl = environment.base_url;
  constructor(private httpClient: HttpClient) { }

  /* Get suppliers group list */
  getSupplierGroups() {
    return this.httpClient.get<any>(this.BaseUrl +'Admin/Setting/getSupplierGroups').pipe(map(result=>{
      return result;
    }))
  }

  /* Get prefered suppliers list */
  getPreferredSuppliersList(groupId: number, limit: number) {
       return this.httpClient.get<any>(this.BaseUrl +'SupplierPreferred/getPreferredSuppliersList/' + this.custId + '/' + groupId + '/' + this.limit).pipe(map(res=>{
      return res;
    }))
  }

  /* Get only selected  prefered suppliers list */
  getOnlyPreferredSuppliers(groupId: number, limit: number) {
    return this.httpClient.get<any>(this.BaseUrl +'SupplierPreferred/getOnlyPreferredSuppliers/' + this.custId + '/' + groupId + '/' + this.limit).pipe(map(res=>{
      return res;
    }))
  }
  /* Get searched preffered supplier data */
  getSearchedPrefSupplier(groupId: number, limit: number,searchData:any){
    return this.httpClient.get<any>(this.BaseUrl +'SupplierPreferred/getPreferredSuppliersList/' + this.custId + '/' + groupId + '/' + this.limit + '/' + searchData).pipe(map(res=>{
      return res;
    }))
  }

  /* Add prefered supplier */
  addPreferredSupplier(info: any) {
    return this.httpClient.post<any>(this.BaseUrl +'SupplierPreferred/addPreferredSupplier', info).pipe(map(res=>{
      return res;
    }))
  }

  /* Delete prefered supplier id */
  deletePreferredSupplier(prefId:any){
    return this.httpClient.delete<any>(this.BaseUrl +'SupplierPreferred/deletePreferredSupplier/'+ prefId).pipe(map(res=>{
      return res;
      
    }))
  }
}
