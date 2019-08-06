import { Component, OnInit, Input, EventEmitter, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../../environments/environment';
import { AdminMaintanceService } from '../admin-maintance.service';
import { EditVehicleChildComponent } from '../edit-vehicle-child/edit-vehicle-child.component'
declare var $: any;
@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent implements OnInit {
  maintenanceData: any;
  finalData = ['data1', 'data2'];
  maintenanceForm: FormGroup;
  UpdateForm: FormGroup;
  interdependentType: FormGroup;
  maintenanceSelectedType = '';
  dropdownData: any;
  dynamicFirstKey: string;
  dynamicSecondKey: string;
  API_URL: string;
  isSubmitted = false;
  FromVehicleChildData: any;
  fromChildComponent: any;
  editTypeSelect = ''
  // For each maintenance data heading
  heading: any;
  // Update Child Component data
  UpdateChildComponentData:any;

  @Input() valueSelected: any;

  constructor(private formBuilder: FormBuilder, private maintenanceService: AdminMaintanceService, private toastr: ToastrManager) { }

  ngOnInit() {

    $('#maintenancePopup').hide();
    $('#maintainDeletePopup').hide();
    $('#UpdatePopup').hide();
    this.getVehicleDatabase();
    this.maintenanceForm = new FormGroup({
      'value': new FormControl(null),
      'dropdown': new FormControl(null)
    })
    this.UpdateForm = new FormGroup({});

  }

  CloseUpdatePopup() {
    $('#UpdatePopup').hide();
  }


  /* get vehcile database data */
  getVehicleDatabase() {
    this.maintenanceService.getVehicleDatabase().subscribe((response: any) => {
      this.maintenanceData = response;
      console.log('from getVehicaleDataBase')
      console.log(this.maintenanceData);

    })
  }
  ClosePopUp() {
    $('#maintenancePopup').hide();
  }

                      /*  ADD new Maintenance DATA START HERE    */

  /* Display Maintenance Popup */
  DisplayMaintenancePopup(maintenanceKey) {
    this.heading = maintenanceKey;
    this.dropdownData = '';
    $('#maintenancePopup').show();
    this.maintenanceSelectedType = maintenanceKey;
    if (maintenanceKey == 'Make') {

      this.maintenanceForm = this.formBuilder.group({
        body_type_id: ['', Validators.required],
        make_name: ['', Validators.required]
      });
      this.dropdownData = this.maintenanceData.data1[0].Body_Type;
      this.API_URL = environment.base_url + '/Admin/Maintance/saveMake';
    } else if (maintenanceKey == 'Model') {
      this.maintenanceForm = this.formBuilder.group({
        make_id: ['', Validators.required],
        model_name: ['', Validators.required]
      });
      this.dropdownData = this.maintenanceData.data1[1].Make;
      this.API_URL = environment.base_url + '/Admin/Maintance/saveModel';
    } else if (maintenanceKey == 'Year') {
      this.maintenanceForm = this.formBuilder.group({
        model_id: ['', Validators.required],
        year_name: ['', Validators.required]
      });
      this.dropdownData = this.maintenanceData.data1[2].Model;
      this.API_URL = environment.base_url + '/Admin/Maintance/saveYear';
    }
    else if (maintenanceKey == 'Series') {
      this.maintenanceForm = this.formBuilder.group({
        year_id: ['', Validators.required],
        series: ['', Validators.required]
      });
      this.dropdownData = this.maintenanceData.data1[3].Year;
      this.API_URL = environment.base_url + '/Admin/Maintance/saveSeries';
    }
    else if (maintenanceKey === 'Transmission Type' || maintenanceKey === 'Fuel Type' || maintenanceKey === 'Engine Type') {
      let maintenancetypeKey = maintenanceKey.replace(" ", "_").toLowerCase();
      this.maintenanceForm = this.formBuilder.group({
        maintance_key: [maintenancetypeKey, Validators.required],
        maintance_value: ['', Validators.required]
      });
      this.dropdownData = this.maintenanceData.data1[3].Year;
      this.API_URL = environment.base_url + '/Admin/Maintance/saveMaintanceData';
    }
  }

  /*  For Validation  */ 
  get groupF() {
    return this.maintenanceForm.controls
  }

   /*  Service call and push new saved data to display array  */ 
  saveGroup() {
    this.isSubmitted = true;
    if (this.maintenanceForm.invalid) return false;
    this.isSubmitted = false;
    if (this.maintenanceForm.valid) {
      this.maintenanceService.saveNewVehicleDetails(this.API_URL, this.maintenanceForm.value).subscribe(data => {
        console.log(data);
        if (data.status) {
          let data = this.maintenanceForm.value;
          this.toastr.successToastr(data.message, 'Success!')
          if (this.maintenanceSelectedType == 'Make') {
            this.maintenanceData.data1[1].Make.push(data);
          }
          else if (this.maintenanceSelectedType == 'Model') {
            this.maintenanceData.data1[2].Model.push(data);
          }
          else if (this.maintenanceSelectedType == 'Year') {
            this.maintenanceData.data1[3].Year.push(data);
          }
          else if (this.maintenanceSelectedType == 'Series') {
            this.maintenanceData.data2[0].Series.push(data);
          }
          else if (this.maintenanceSelectedType === 'Transmission Type') {
            this.maintenanceData.data2[1].transmission_type.push(data);
 
          }
          else if (this.maintenanceSelectedType === 'Fuel Type') {
            this.maintenanceData.data2[2].fuel_type.push(data);
          }
          else if (this.maintenanceSelectedType === 'Engine Type') {
            this.maintenanceData.data2[3].engine_type.push(data);
          }
        }
        if (!data.status)
          this.toastr.errorToastr(data.message, 'Oops!')
        console.log(data);

        $('#maintenancePopup').hide();
      }, error => {
        console.log(error);
        this.toastr.errorToastr('Something went wrong !', 'Oops!')
      })
    } else {
      this.toastr.warningToastr('Please provide valid input', 'Warning !')
      this.maintenanceForm.reset();
    }
  }


 
                                 /*   ADD ends Here    */ 

                                /*  DELETE Starts Here   */


 dataFromVehicleChild(data) {
    this.FromVehicleChildData = data;
  }


/* To remove perticular record From DB */ 
  removeFromDB() {
    console.log(this.FromVehicleChildData);
    let postData = {};
    postData['is_delete'] = "1";
    //  For Year 
    if (this.FromVehicleChildData.year_name) {
      this.API_URL = environment.base_url + '/Admin/Maintance/updateYear'
      postData['year_id'] = this.FromVehicleChildData.year_id;
      console.log(postData);
      this.commonCall(this.API_URL, postData,this.FromVehicleChildData.index);
    }

    // For  model 
    else if (this.FromVehicleChildData.model_name) {
      this.API_URL = environment.base_url + '/Admin/Maintance/updateModel'
      postData['model_id'] = this.FromVehicleChildData.model_id;
      console.log(postData);
      this.commonCall(this.API_URL, postData,this.FromVehicleChildData.index);
    }

    // For  serise  
    else if (this.FromVehicleChildData.series) {
      this.API_URL = environment.base_url + '/Admin/Maintance/updateSeries'
      postData['series_id'] = this.FromVehicleChildData.series_id;
      this.commonCall(this.API_URL, postData,this.FromVehicleChildData.index);
    }

    //  For make 
    else if (this.FromVehicleChildData.make_name) {
      this.API_URL = environment.base_url + '/Admin/Maintance/updateMake'
      postData['make_id'] = this.FromVehicleChildData.make_id;
      this.commonCall(this.API_URL, postData,this.FromVehicleChildData.index);
    }
    // For transmission type inside of maintance
    else if (this.FromVehicleChildData.maintance_key == 'transmission_type') {
      console.log("FROM transmission_type")
      this.API_URL = environment.base_url + '/Admin/Maintance/updateMaintanceData';
      postData['maintance_id'] = this.FromVehicleChildData.maintance_id;
      this.commonCallForMaintance(this.API_URL, postData,this.FromVehicleChildData.index);
    }

    // For fuel_type type inside of maintance
    else if (this.FromVehicleChildData.maintance_key == 'fuel_type') {
      this.API_URL = environment.base_url + '/Admin/Maintance/updateMaintanceData';
      postData['maintance_id'] = this.FromVehicleChildData.maintance_id;
      this.commonCallForMaintance(this.API_URL, postData,this.FromVehicleChildData.index);
    }

    // For engine_type type inside of maintance
    else if (this.FromVehicleChildData.maintance_key == 'engine_type') {
      this.API_URL = environment.base_url + '/Admin/Maintance/updateMaintanceData';
      postData['maintance_id'] = this.FromVehicleChildData.maintance_id;
      this.commonCallForMaintance(this.API_URL, postData,this.FromVehicleChildData.index);
    }
    else if (this.FromVehicleChildData.maintance_key == 'body_type') {
      this.API_URL = environment.base_url + '/Admin/Maintance/updateMaintanceData';
      postData['maintance_id'] = this.FromVehicleChildData.maintance_id;
 
      this.commonCallForMaintance(this.API_URL, postData,this.FromVehicleChildData.index);
    }
  }


  
  /* Close Delete popup */
  closeDeletedConfrimPopUp() {
    $('#maintainDeletePopup').hide();
  }

  /*   Common service call for delete with post request */
  commonCall(url: any, parameters, index) {

    this.maintenanceService.UpdateData(url, parameters)
      .subscribe((data) => {
        /*  Remove data from Display */
        if (this.FromVehicleChildData.make_id) {
          this.maintenanceData.data1[1].Make.splice(index, 1);
          // console.log(this.maintenanceData.data1[1].Make);
        }
        if (this.FromVehicleChildData.model_id) {
          this.maintenanceData.data1[2].Model.splice(index, 1)
        }
        if (this.FromVehicleChildData.year_id) {
          this.maintenanceData.data1[3].Year.splice(index, 1);
          console.log(this.maintenanceData.data1[3].Year)
        }
        if (this.FromVehicleChildData.series_id) {
          this.maintenanceData.data2[0].Series.splice(index, 1);
        }

        this.toastr.successToastr(data.message, "Succsess!")
        this.closeDeletedConfrimPopUp()
      }, error => console.log('From error = ' + error));
  }

   /*   Common service call for delete with put request */
  commonCallForMaintance(url: any, parameters,index) {
    console.log(this.FromVehicleChildData);
    this.maintenanceService.MaintanceData(url, parameters)
      .subscribe((data) => {
        console.log(data);
                /*    Remove data from display   */
        if(this.FromVehicleChildData.maintance_key ==  "transmission_type"){
          this.maintenanceData.data2[1].Transmission_Type.splice(index, 1);
        }
        if(this.FromVehicleChildData.maintance_key == "fuel_type"){
          this.maintenanceData.data2[2].Fuel_Type.splice(index, 1)
        }
        if(this.FromVehicleChildData.maintance_key == "engine_type"){
          this.maintenanceData.data2[3].Engine_Type.splice(index,1);
        }
        this.toastr.successToastr(data.info, "Success!");
        this.closeDeletedConfrimPopUp();
      }, error => {
        console.log(error);
        this.toastr.errorToastr("Something went wrong..", "Oops!");
      })
  }


                                /*   DELETE ends Here   */ 


                                 /* Update Start here */
  


  reciveData(data) {
    this.dropdownData = '';
    this.fromChildComponent = data;
    // For Update Year 
    if (this.fromChildComponent.year_name) {
      this.editTypeSelect = 'Year';
      this.UpdateForm = this.formBuilder.group({
        model_id: [data.model_id, Validators.required],
        year_id: [data.year_id, Validators.required],
        year_name: [data.year_name, Validators.required]
      })
      this.API_URL = environment.base_url + '/Admin/Maintance/updateYear';
      this.dropdownData = this.maintenanceData.data1[2].Model
    }
    // For Update Model 
    else if (this.fromChildComponent.model_name) {
      this.editTypeSelect = 'Model';
      this.UpdateForm = this.formBuilder.group({
        make_id: [data.make_id, Validators.required],
        model_id: [data.model_id, Validators.required],
        model_name: [data.model_name, Validators.required]
      })
      this.API_URL = environment.base_url + '/Admin/Maintance/updateModel';
      this.dropdownData = this.maintenanceData.data1[1].Make;
    }
    // For Update Make
    else if (this.fromChildComponent.make_name) {
      this.editTypeSelect = 'Make';
      this.UpdateForm = this.formBuilder.group({
        body_type_id: [data.body_type_id, Validators.required],
        make_id: [data.make_id, Validators.required],
        make_name: [data.make_name, Validators.required]
      })

      this.API_URL = environment.base_url + '/Admin/Maintance/updateMake'
      this.dropdownData = this.maintenanceData.data1[0].Body_Type;
    }
    // For Update Series
    else if (this.fromChildComponent.series) {
      this.editTypeSelect = 'series';
      this.UpdateForm = this.formBuilder.group({
        year_id: [data.year_id, Validators.required],
        series_id: [data.series_id, Validators.required],
        series: [data.series, Validators.required]
      });

      this.dropdownData = this.maintenanceData.data1[3].Year;
      this.API_URL = environment.base_url + '/Admin/Maintance/updateSeries'
    }
    // Update MaintanceData 
    else if (this.fromChildComponent.maintance_key == "engine_type" || this.fromChildComponent.maintance_key == "fuel_type" || this.fromChildComponent.maintance_key == "fuel_type" || this.fromChildComponent.maintance_key == "transmission_type") {
      this.editTypeSelect = 'common';
      this.UpdateForm = this.formBuilder.group({
        maintance_id: [data.maintance_id, Validators.required],
        maintance_value: [data.maintance_value, Validators.required]
      });
      this.API_URL = environment.base_url + '/Admin/Maintance/updateMaintanceData'
    }


  }

  callToService() {
    if(this.UpdateForm.valid){
      this.UpdateChildComponentData = this.UpdateForm.value;
    }
    if (this.UpdateForm.valid) {
      this.maintenanceService.UpdateMaintanceData(this.API_URL, this.UpdateForm.value).subscribe(data => {
        console.log(data)
        if (data.status === 0) {
          this.toastr.errorToastr(data.message, "Warning!")
        }
        if (data.status === 1) {
          // For model
          if(this.fromChildComponent.model_name){
            let model_name = this.UpdateChildComponentData.model_name
              this.maintenanceData.data1[2].Model[this.fromChildComponent.index].model_name = model_name;
          }
          // For make 
          if(this.fromChildComponent.make_name){
            let make_name = this.UpdateChildComponentData.make_name;
            this.maintenanceData.data1[1].Make[this.fromChildComponent.index].make_name = make_name;
          }
          // For Year
          if(this.fromChildComponent.year_name){
            let year_name = this.UpdateChildComponentData.year_name;
            this.maintenanceData.data1[3].Year[this.fromChildComponent.index].year_name = year_name;
          }
          // For Series
          if(this.fromChildComponent.series){
            let series = this.UpdateChildComponentData.series;
            console.log(series)
            this.maintenanceData.data2[0].Series[this.fromChildComponent.index].series = series;
          }
          this.toastr.successToastr(data.message, 'Success!');
          this.CloseUpdatePopup();
        }

      }, error => {
        this.toastr.errorToastr('Oops!')
        console.log(error)
      });
    }
    if (this.UpdateForm.invalid) {
      this.toastr.errorToastr('Form is Invalid', 'Warning!')
    }


  };

  /*  */ 
  OnSubmitUpdateForm() {

    /* For Update Series */
    if (this.editTypeSelect == 'series') {
      this.callToService();
    }
    /* For Update Year */
    if (this.editTypeSelect == 'Year') {
      this.callToService();
    }
    /* For Update Model */
    if (this.editTypeSelect == 'Model') {
      this.callToService();
    }
    /* For Update Make */
    if (this.editTypeSelect == 'Make') {
      this.callToService();
    }
    if (this.editTypeSelect == 'common') {
      this.UpdateForm.value.maintance_id = this.fromChildComponent.maintance_id;
      if (this.UpdateForm.valid) {
        this.maintenanceService.UpdateMaintananceDataPUT(this.API_URL, this.UpdateForm.value).subscribe(data => {
          if (data.msg == 'error') {
            this.toastr.errorToastr(data.info, data.msg);
          } else {
            this.UpdateChildComponentData = this.UpdateForm.value;
            if(this.fromChildComponent.maintance_key ==  "transmission_type"){
              let maintance_value = this.UpdateChildComponentData.maintance_value;
              console.log(maintance_value)
              console.log(this.maintenanceData.data2[1].Transmission_Type[this.fromChildComponent.index])
              this.maintenanceData.data2[1].Transmission_Type[this.fromChildComponent.index].maintance_value = maintance_value;
            }
            if(this.fromChildComponent.maintance_key ==  "fuel_type"){
              let maintance_value = this.UpdateChildComponentData.maintance_value;
              console.log(maintance_value);
              console.log(this.maintenanceData.data2[2].Fuel_Type[this.fromChildComponent.index])
              this.maintenanceData.data2[2].Fuel_Type[this.fromChildComponent.index].maintance_value = maintance_value;
            }
            if(this.fromChildComponent.maintance_key ==  "engine_type"){
              let maintance_value = this.UpdateChildComponentData.maintance_value;
              console.log(maintance_value);
              console.log(this.maintenanceData.data2[3].Engine_Type[this.fromChildComponent.index])
              this.maintenanceData.data2[3].Engine_Type[this.fromChildComponent.index].maintance_value = maintance_value;
            }
            this.toastr.successToastr(data.info, data.msg)
            this.CloseUpdatePopup();

          }

        }, (error) => {

          console.log(error)
        })
      }
      if (this.UpdateForm.invalid) {
        this.toastr.errorToastr("Form is Invalid!")
      }

    }

  }



}

