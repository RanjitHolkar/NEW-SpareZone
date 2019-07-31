import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Form, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../../environments/environment';
import { AdminMaintanceService } from '../admin-maintance.service';

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
  interdependentType: FormGroup;
  maintenanceSelectedType = '';
  dropdownData: any;
  dynamicFirstKey: string;
  dynamicSecondKey: string;
  API_URL: string;
  isSubmitted = false;
  FromVehicleChildData: any;
  heading: any;


  @Input() valueSelected: any;
  @Input() editData: any;

  constructor(private formBuilder: FormBuilder, private maintenanceService: AdminMaintanceService, private toastr: ToastrManager) { }

  ngOnInit() {
    console.log("From edit vehicle")
    this.editDataFromChild
    $('#maintenancePopup').hide();
    $('#maintainDeletePopup').hide();
    this.getVehicleDatabase();
    this.maintenanceForm = new FormGroup({
      'value': new FormControl(null),
      'dropdown': new FormControl(null)
    })

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

  commomnGroup(id, name) {
    this.maintenanceForm = this.formBuilder.group({
      body_type_id: ['', Validators.required],
      make_name: ['', Validators.required]
    });
  }
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

  get groupF() {
    return this.maintenanceForm.controls
  }

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

  /* Close Delete popup */
  closeDeletedConfrimPopUp() {
    $('#maintainDeletePopup').hide();
  }

  
  dataFromVehicleChild(data) {
    this.FromVehicleChildData = data;
    

    // this.maintenanceService.updateYear()
    console.log(data);
  }
  // Here we pass url and post data 
  commonCall(url: any, parameters) {

    this.maintenanceService.UpdateData(url, parameters)
      .subscribe((data) => {
        console.log(data)
        this.toastr.successToastr(data.message, "Succsess!")
        this.closeDeletedConfrimPopUp()
      }, error => console.log('From error = ' + error));
  }

  commonCallForMaintance(url: any, parameters) {
    this.maintenanceService.MaintanceData(url, parameters)
      .subscribe((data) => {
        console.log(data);
        this.toastr.successToastr(data.info, "Success!");
        this.closeDeletedConfrimPopUp();
      }, error => {
        console.log(error);
        this.toastr.errorToastr("Something went wrong..", "Oops!");
      })
  }


  removeFromDB() {
    console.log(this.FromVehicleChildData);
    let postData = {};
    postData['is_delete'] = "1";
    //  For Year 
    if (this.FromVehicleChildData.year_name) {
      this.API_URL = environment.base_url + '/Admin/Maintance/updateYear'
      postData['year_id'] = this.FromVehicleChildData.year_id;
      console.log(postData);
      this.commonCall(this.API_URL, postData);
    }

    // For update model 
    else if (this.FromVehicleChildData.model_name) {
      this.API_URL = environment.base_url + '/Admin/Maintance/updateModel'
      postData['model_id'] = this.FromVehicleChildData.model_id;
      console.log(postData);
      this.commonCall(this.API_URL, postData);
    }

    // For update serise  
    else if (this.FromVehicleChildData.series) {
      this.API_URL = environment.base_url + '/Admin/Maintance/updateSeries'
      postData['series_id'] = this.FromVehicleChildData.series_id;
      console.log(postData);
      this.commonCall(this.API_URL, postData);
    }

    //  For make 
    else if (this.FromVehicleChildData.make_name) {
      this.API_URL = environment.base_url + '/Admin/Maintance/updateMake'
      postData['make_id'] = this.FromVehicleChildData.make_id;
      console.log(postData);
      this.commonCall(this.API_URL, postData);
    }
    // For transmission type inside of maintance
    else if (this.FromVehicleChildData.maintance_key == 'transmission_type') {
      console.log("FROM transmission_type")
      this.API_URL = environment.base_url + '/Admin/Maintance/updateMaintanceData';
      postData['maintance_id'] = this.FromVehicleChildData.maintance_id;
      console.log(postData);
      this.commonCallForMaintance(this.API_URL, postData);
    }

    // For fuel_type type inside of maintance
    else if (this.FromVehicleChildData.maintance_key == 'fuel_type') {
      this.API_URL = environment.base_url + '/Admin/Maintance/updateMaintanceData';
      postData['maintance_id'] = this.FromVehicleChildData.maintance_id;
      console.log(postData);
      this.commonCallForMaintance(this.API_URL, postData);
    }

    // For engine_type type inside of maintance
    else if (this.FromVehicleChildData.maintance_key == 'engine_type') {
      this.API_URL = environment.base_url + '/Admin/Maintance/updateMaintanceData';
      postData['maintance_id'] = this.FromVehicleChildData.maintance_id;
      console.log(postData);
      this.commonCallForMaintance(this.API_URL, postData);
    }
    else if (this.FromVehicleChildData.maintance_key == 'body_type') {
      this.API_URL = environment.base_url + '/Admin/Maintance/updateMaintanceData';
      postData['maintance_id'] = this.FromVehicleChildData.maintance_id;
      console.log(postData);
      this.commonCallForMaintance(this.API_URL, postData);
    }
  }
  
  editDataFromChild(editData){
    $('#maintainDeletePopup').show();
    console.log("From editDataFromChild")
    console.log(editData);
  }

}
