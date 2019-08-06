import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
public Base_url = environment.base_url;
  constructor(private httpClient:HttpClient) { }
  getMakes(){
    return this.httpClient.get<any>( this.Base_url + 'Admin/Maintance/getMakes/').pipe(map(res=>{
      return res;
    }))
  }
  getModel(info:any){
    return this.httpClient.get<any>( this.Base_url + 'Admin/Maintance/getModels/'+info).pipe(map(res=>{
      return res;
    }))
  }
  getYear(){
    return this.httpClient.get<any>( this.Base_url + 'Admin/Maintance/getYears/').pipe(map(res=>{
      return res;
    }))
  }
  getBodyType(){
    return this.httpClient.get<any>(this.Base_url +'Admin/Maintance/getMaintenanceData/body_type').pipe(map(res=>{
      return res;
    }))
  }
  getEngineType(){
    return this.httpClient.get<any>(this.Base_url +'Admin/Maintance/getMaintenanceData/engine_type').pipe(map(res=>{
      return res;
    }))
  }
  getTransmissionType(){
    return this.httpClient.get<any>(this.Base_url +'Admin/Maintance/getMaintenanceData/transmission_type').pipe(map(res=>{
      return res;
    }))
  }
  saveSearchData(info:any){
    return this.httpClient.post<any>(this.Base_url +'CarProfile/createCarProfile',info).pipe(map(res=>{
      return res;
    }))
  }
  
}
