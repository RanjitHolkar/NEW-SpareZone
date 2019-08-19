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

  /* Get Categories */
  getCategories(){
    return this.http.get(environment.base_url + 'Admin/Categories/getCategoryList').pipe(map((result:any)=>{
      return result;
    }))
  }
  /* Save Categories */
  saveCategory(categoryData){
    return this.http.post(environment.base_url + 'Admin/Categories/saveCategoriesData',categoryData).pipe(map((result:any)=>{
      return result;
    }))
  }

  /* Update Ctaegories */
  updateCategory(updateData){
    return this.http.put(environment.base_url+'Admin/Categories/updateCategoriesData',updateData).pipe(map((result:any)=>{
      return result;
    }))
  }

  /* Update Part */
  updatePart(updateData){
    return this.http.put(environment.base_url+'Admin/Parts/updatePartsData',updateData).pipe(map((result:any)=>{
      return result;
    }))
  }

  /* Save Categories */
  saveParts(partData){
    return this.http.post(environment.base_url + 'Admin/Parts/saveParts',partData).pipe(map((result:any)=>{
      return result;
    }))
  }

   /* Get parts by category ID */
   getPartByCategoryID(categoryID){
    return this.http.get(environment.base_url + 'Admin/Parts/getPartsByCategory/'+categoryID).pipe(map((result:any)=>{
      return result;
    }))
  }

  /* Get Assigned Parts */
  getAssignedParts(bodyTypeID){
    return this.http.get(environment.base_url+'Admin/AssignedParts/getPartsByBodyID/'+bodyTypeID).pipe(map((result:any)=>{
      return result;
    }))
  }

  /* Save assigned Parts */
  saveAssignedParts(partData){
    return this.http.post(environment.base_url+'Admin/AssignedParts/saveAssignedPartsData',partData).pipe(map((result:any)=>{
      return result;
    }))
  }

   /* Update Assigned Parts */
   updateAssignedPart(updateData){
    return this.http.put(environment.base_url+'Admin/AssignedParts/updateAssignedPart',updateData).pipe(map((result:any)=>{
      return result;
    }))
  }
  
  UpdateMaintanceData(url, parameter){
    return this.http.post(url, parameter).pipe(map((res:any)=> { return res}) );
  };

  UpdateMaintananceDataPUT(url,parameter){
    return this.http.put(url, parameter).pipe(map((res:any)=> {return res}));
  }

  
  getMakes(number){
    return this.http.get(`http://portfolio.theaxontech.com/CI/sparezone/Admin/Maintance/getMakes/${number}`).pipe(map((res:any)=> {return res}))
  }


  getModels(number){
    return this.http.get(`http://portfolio.theaxontech.com/CI/sparezone/Admin/Maintance/getModel/${number}`).pipe(map((res:any)=> { return res}))
  }

}
