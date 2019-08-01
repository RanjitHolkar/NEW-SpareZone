import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminProfileService {
public base_url =environment.base_url;
  constructor(private httpClient:HttpClient) { }
  getUserDetails(){
    return this.httpClient.get<any>(this.base_url + 'User/getUserDeatils').pipe(map(res=>{
      return res;
    }))
  }
}
