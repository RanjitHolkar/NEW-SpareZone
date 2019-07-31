import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminSettingService {

  constructor(private http: HttpClient) { }
  /* Get user profile */
  getUserPrfole() {
    return this.http.get<any>(environment.base_url + 'User/getUserDeatils').pipe(map((res: any) => {
      return res;
    }));
  }
  //Update Admin Profile Data: START
  updateAdminProfile(adminData) {
    return this.http.post<any>(environment.base_url + 'User/updateUser', adminData).pipe(map((res: any) => {
      return res;
    }));
  }
  //Update Admin Profile Data: END

  /* Get general settings */
  getGeneralSetting() {
    return this.http.get<any>(environment.base_url + 'Admin/Setting/getGeneralSetting').pipe(map((res: any) => {
      return res;
    }));
  }

  /* Update general setting */
  updateGeneralSetting(generalData) {
    return this.http.post<any>(environment.base_url + 'Admin/Setting/updateGeneralSetting', generalData).pipe(map((res: any) => {
      return res;
    }));
  }

  /* Get general settings */
  getCMSSetting() {
    return this.http.get<any>(environment.base_url + 'Admin/Setting/getCMSSetting').pipe(map((res: any) => {
      return res;
    }));
  }

  /* Update general setting */
  updateCMSSetting(generalData) {
    return this.http.post<any>(environment.base_url + 'Admin/Setting/updateCMSSetting', generalData).pipe(map((res: any) => {
      return res;
    }));
  }

  /* Get list of all groups */
  getAllGroups() {
    return this.http.get<any>(environment.base_url + 'Admin/Setting/getSupplierGroups').pipe(map((res: any) => {
      return res;
    }));
  }

  /* Save the supplier group */
  saveSupplierGroup(groupData) {
    return this.http.post<any>(environment.base_url + 'Admin/Setting/addSupplierGroup', groupData).pipe(map((res: any) => {
      return res;
    }));
  }
}
