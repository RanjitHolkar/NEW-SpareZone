import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminMaintanceService {

  constructor(private http: HttpClient) { }
  /* get vehcile database data */
  getVehicleDatabase() {
    return this.http.get<any>(environment.base_url + 'Admin/Maintance/getAllMaintenanceData').pipe(map((res: any) => {
      return res;
    }));
  }

 UpdateData(url, parameter){
  return this.http.post(url, parameter).pipe(map((res:any) => {
     return res}));
 }

  saveNewVehicleDetails(url, obj) {
    return this.http.post(url, obj).pipe(map((res:any)=>{
      return res;
    }))
  }

  MaintanceData(url, parameter){
    return this.http.put(url, parameter).pipe(map((res:any)=> {
      return res;
    }))
  }


}
