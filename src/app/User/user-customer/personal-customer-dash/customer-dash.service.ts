import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CustomerDashService {
public Base_Url = environment.base_url;
  constructor(private _httpClient:HttpClient) { }
  getCarProfileList(id:any){
    return this._httpClient.get<any>(this.Base_Url + 'CarProfile/getCarProfileList/'+id).pipe(map(res=>{
      return res;
    }))
  }
  /* Get User Details*/
  getUserDetails(){
      return this._httpClient.get<any>(this.Base_Url + 'User/getUserDeatils').pipe(map(res=>{
        return res;
      }))
    }
}
