import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BusinessCustomerDashService {
BaseUrl = environment.base_url;
  constructor(private httpClient:HttpClient) { }
  getDriveTrainDetails(){
    return this.httpClient.get<any>(this.BaseUrl + 'Admin/Maintance/getMaintenanceData/drive_train').pipe(map(res=>{
      return res;
    }))
  }
}
