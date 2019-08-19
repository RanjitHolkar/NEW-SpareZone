import { Component, OnInit, Input, EventEmitter, ViewChild, ɵConsole } from '@angular/core';
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
  BodyType: FormGroup;
  maintenanceSelectedType = '';
  dropdownData: any;
  dynamicFirstKey: string;
  dynamicSecondKey: string;
  API_URL: string;
  isSubmitted = false;
  isUpdated = false;
  isBodyType = false;
  isBodyTypeEdit = false;
  FromVehicleChildData: any;
  fromChildComponent: any;
  editTypeSelect = ''
  // For each maintenance data heading
  heading: any;
  title: any;
  updateData = {};
  // Update Child Component data
  UpdateChildComponentData: any;
  // Keys For Add Field
  keys: any;
  image: any;
  imageUrl: any;
  imageForEdit: any;
  restrict = false

  @Input() valueSelected: any;

  constructor(private formBuilder: FormBuilder, private maintenanceService: AdminMaintanceService, private toastr: ToastrManager) { }

  ngOnInit() {
    $('.overlayDivLoader').hide();
    $('#maintenancePopup').hide();
    $('#maintainDeletePopup').hide();
    $('#UpdatePopup').hide();
    /*  For alerts   */
    $('#deletePopup').hide();
    $('#editPopup').hide();
    $('#addedPopup').hide();
           /*   */
    this.getVehicleDatabase();
    this.maintenanceForm = new FormGroup({
      'value': new FormControl(null),
      'dropdown': new FormControl(null)
    })
    this.UpdateForm = new FormGroup({});
    this.BodyType = new FormGroup({});
  }

  /*  For alerts  */
  deletePopupClose() {
    console.log("close popup for delete hit");
    $('#deletePopup').hide();
  }

  addPopupClose(){
    console.log("Close popup for add hit")
    $('#addedPopup').hide();
  }

  editPopupClose() {
    console.log("Close popup for edit hit");
    $('#editPopup').hide();
  }

  /*  alerts ends here */

  CloseUpdatePopup() {
    $('#UpdatePopup').hide();
  }

  /* get vehcile database data */
  getVehicleDatabase() {
    this.maintenanceService.getVehicleDatabase().subscribe((response: any) => {
      this.maintenanceData = response;
      console.log(this.maintenanceData);
    })
  }
  ClosePopUp() {
    this.maintenanceForm.reset();
    $('#maintenancePopup').hide();
    this.imageUrl = null;
     this.isSubmitted = false;

  }


  /*  ADD new Maintenance DATA START HERE    */

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageUrl = reader.result;
      reader.readAsDataURL(this.image);
    }
  }
  /* Display Maintenance Popup */
  DisplayMaintenancePopup(maintenanceKey) {
    if (maintenanceKey == "Body Type") {
      this.BodyType.reset();
    }
    this.heading = maintenanceKey;
    this.dropdownData = '';
    $('#maintenancePopup').show();
    this.maintenanceSelectedType = maintenanceKey;
    if (maintenanceKey == 'Make') {
      this.restrict = true;
      this.maintenanceForm = this.formBuilder.group({
        body_type_id: ['', Validators.required],
        make_name: ['', Validators.required]
      });
      this.dropdownData = this.maintenanceData.data1[0].Body_Type;
      this.API_URL = environment.base_url + '/Admin/Maintance/saveMake';
    } else if (maintenanceKey == 'Model') {
      this.restrict = true;
      this.maintenanceForm = this.formBuilder.group({
        make_id: ['', Validators.required],
        model_name: ['', Validators.required]
      });
      this.dropdownData = this.maintenanceData.data1[1].Make;
      this.API_URL = environment.base_url + '/Admin/Maintance/saveModel';
    } else if (maintenanceKey == 'Year') {
      this.restrict = true;
      this.maintenanceForm = this.formBuilder.group({
        model_id: ['', Validators.required],
        year_name: ['', Validators.required]
      });
      this.dropdownData = this.maintenanceData.data1[2].Model;
      this.API_URL = environment.base_url + '/Admin/Maintance/saveYear';
    }
    else if (maintenanceKey == 'Series') {
      this.restrict = true;
      this.maintenanceForm = this.formBuilder.group({
        year_id: ['', Validators.required],
        series: ['', Validators.required]
      });
      this.dropdownData = this.maintenanceData.data1[3].Year;
      this.API_URL = environment.base_url + '/Admin/Maintance/saveSeries';
    }
    /*  For Body Type  */
    else if (maintenanceKey == 'Body Type') {
      this.BodyType = this.formBuilder.group({
        maintance_key:    ['body_type', Validators.required],
        maintance_value:  ['', Validators.required],
        maintenance_image:['', Validators.required]
      });

      this.API_URL = environment.base_url + 'Admin/Maintance/saveBodyType';
    }

    else if (maintenanceKey === 'Transmission Type' || maintenanceKey === 'Fuel Type' || maintenanceKey === 'Engine Type') {
      let maintenancetypeKey = maintenanceKey.replace(" ", "_").toLowerCase();
      this.restrict = true;
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

  get groupBodyType() {
    return this.BodyType.controls
  }

  /*  Service call and push new saved data to display array  */
  saveGroup() {
    this.isSubmitted = true;
    if (this.maintenanceForm.invalid) {
      this.maintenanceForm.reset();
      return false;
    }
    $('.overlayDivLoader').show();
    if (this.heading == "Body Type") {
      this.isBodyType = true
      let data = this.BodyType.value;
      let bodyTypeFormData = new FormData();
      bodyTypeFormData.append('maintance_key', 'body_type');
      bodyTypeFormData.append('maintance_value', this.BodyType.value.maintance_value);
      bodyTypeFormData.append('maintenance_image', this.image);
      this.maintenanceService.saveNewVehicleDetails(this.API_URL, bodyTypeFormData).subscribe(responseResult => {
        if (responseResult.status) {
          this.isBodyType = false
          this.toastr.successToastr(responseResult.message, 'Success');
          data['maintance_id'] = responseResult.maintance_id;
          data['maintance_key'] = 'body_type';
          data['maintenance_image'] = responseResult.image_path;
          this.maintenanceData.data1[0].Body_Type.push(data);
          $('#maintenancePopup').hide();
        } else if (!responseResult.status) {
          this.toastr.errorToastr(responseResult.message, 'Oops!!');

        }
        $('.overlayDivLoader').hide();
      }, error => {
        this.toastr.errorToastr(error, 'Oops!!');
        $('.overlayDivLoader').hide();
      })
    }
    else {
      if (this.maintenanceForm.valid) {
        this.maintenanceService.saveNewVehicleDetails(this.API_URL, this.maintenanceForm.value).subscribe(val => {
          this.isSubmitted = false;
          this.keys = val;
          if (val.status) {
            $('.overlayDivLoader').hide();
            console.log(val)
            this.toastr.successToastr(val.message, "Success!")
            $('#addedPopup').show();
            let data = this.maintenanceForm.value;
            if (this.maintenanceSelectedType == 'Make') {
              data['make_id'] = this.keys.make_id
              this.maintenanceData.data1[1].Make.push(data);
              $('.overlayDivLoader').hide();
            }

            else if (this.maintenanceSelectedType == 'Model') {
              data['model_id'] = this.keys.model_id;
              this.maintenanceData.data1[2].Model.push(data);
              $('.overlayDivLoader').hide();
            }

            else if (this.maintenanceSelectedType == 'Year') {
              data['year_id'] = this.keys.year_id;
              this.maintenanceData.data1[3].Year.push(data);
              $('.overlayDivLoader').hide();
            }

            else if (this.maintenanceSelectedType == 'Series') {
              data['series_id'] = this.keys.series_id;
              this.maintenanceData.data2[0].Series.push(data);
              $('.overlayDivLoader').hide();
            }

            else if (this.maintenanceSelectedType === 'Transmission Type') {
              data['maintance_id'] = this.keys.maintance_id;
              this.maintenanceData.data2[1].Transmission_Type.push(data);
              $('.overlayDivLoader').hide();
            }

            else if (this.maintenanceSelectedType === 'Fuel Type') {
              data['maintance_id'] = this.keys.maintance_id
              this.maintenanceData.data2[2].Fuel_Type.push(data);
              $('.overlayDivLoader').hide();
            }

            else if (this.maintenanceSelectedType === 'Engine Type') {
              data['maintance_id'] = this.keys.maintance_id
              this.maintenanceData.data2[3].Engine_Type.push(data);
              $('.overlayDivLoader').hide();
            }
          }
          if (!val.status) {
            this.maintenanceForm.reset();
            $('.overlayDivLoader').hide();
            this.toastr.errorToastr(val.message, 'Oops!')
          }
          $('#maintenancePopup').hide();
        }, error => {
          this.maintenanceForm.reset();
          $('.overlayDivLoader').hide();
          this.toastr.errorToastr('Something went wrong !', 'Oops!')
        })
      } 
      else {
        $('.overlayDivLoader').hide();
        this.toastr.warningToastr('Please provide valid input', 'Warning !')
        this.maintenanceForm.reset();
      }
    }
  }

  /*   ADD ends Here    */

  /*  DELETE Starts Here */

  dataFromVehicleChild(data) {
    this.FromVehicleChildData = data;
    console.log(this.FromVehicleChildData)
  }

  /* To remove perticular record From DB */
  removeFromDB() {
    let postData = {};
    postData['is_delete'] = "1";
    //  For Year
    if (this.FromVehicleChildData.year_name) {
      this.title = 'Year'
      this.heading = this.FromVehicleChildData.year_name;
      this.API_URL = environment.base_url + '/Admin/Maintance/updateYear'
      postData['year_id'] = this.FromVehicleChildData.year_id;
      console.log(postData);
      this.commonCall(this.API_URL, postData, this.FromVehicleChildData.index);
    }

    // For  model
    else if (this.FromVehicleChildData.model_name) {
      this.title = 'Model'
      this.heading = this.FromVehicleChildData.model_name;
      this.API_URL = environment.base_url + '/Admin/Maintance/updateModel'
      postData['model_id'] = this.FromVehicleChildData.model_id;
      console.log(postData);
      this.commonCall(this.API_URL, postData, this.FromVehicleChildData.index);
    }

    // For  serise
    else if (this.FromVehicleChildData.series) {
      this.title = 'Series'
      this.heading = this.FromVehicleChildData.series;
      this.API_URL = environment.base_url + '/Admin/Maintance/updateSeries'
      postData['series_id'] = this.FromVehicleChildData.series_id;
      this.commonCall(this.API_URL, postData, this.FromVehicleChildData.index);
    }

    //  For make
    else if (this.FromVehicleChildData.make_name) {
      this.title = 'Make'
      this.heading = this.FromVehicleChildData.make_name;
      this.API_URL = environment.base_url + '/Admin/Maintance/updateMake'
      postData['make_id'] = this.FromVehicleChildData.make_id;
      this.commonCall(this.API_URL, postData, this.FromVehicleChildData.index);
    }
    // For transmission type inside of maintance
    else if (this.FromVehicleChildData.maintance_key == 'transmission_type') {
      this.title = 'Transmission type'
      this.heading = this.FromVehicleChildData.maintance_value
      this.API_URL = environment.base_url + '/Admin/Maintance/updateMaintanceData';
      postData['maintance_id'] = this.FromVehicleChildData.maintance_id;
      this.commonCallForMaintance(this.API_URL, postData, this.FromVehicleChildData.index);
    }

    // For fuel_type type inside of maintance
    else if (this.FromVehicleChildData.maintance_key == 'fuel_type') {
      this.title = 'Fuel type'
      this.heading = this.FromVehicleChildData.maintance_value
      this.API_URL = environment.base_url + '/Admin/Maintance/updateMaintanceData';
      postData['maintance_id'] = this.FromVehicleChildData.maintance_id;
      this.commonCallForMaintance(this.API_URL, postData, this.FromVehicleChildData.index);
    }

    // For engine_type type inside of maintance
    else if (this.FromVehicleChildData.maintance_key == 'engine_type') {
      this.title = 'Engine type'
      this.heading = this.FromVehicleChildData.maintance_value
      this.API_URL = environment.base_url + '/Admin/Maintance/updateMaintanceData';
      postData['maintance_id'] = this.FromVehicleChildData.maintance_id;
      this.commonCallForMaintance(this.API_URL, postData, this.FromVehicleChildData.index);
    }
    else if (this.FromVehicleChildData.maintance_key == 'body_type') {
      this.title = 'Body type'
      this.API_URL = environment.base_url + '/Admin/Maintance/updateMaintanceData';
      postData['maintance_id'] = this.FromVehicleChildData.maintance_id;
      console.log(this.FromVehicleChildData.maintance_id);
      console.log(postData)
      this.commonCallForMaintance(this.API_URL, postData, this.FromVehicleChildData.index);
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
        }
        if (this.FromVehicleChildData.model_id) {
          this.maintenanceData.data1[2].Model.splice(index, 1)
        }
        if (this.FromVehicleChildData.year_id) {
          this.maintenanceData.data1[3].Year.splice(index, 1);
        }
        if (this.FromVehicleChildData.series_id) {
          this.maintenanceData.data2[0].Series.splice(index, 1);
        }
        if (this.FromVehicleChildData.maintance_id) {
          this.maintenanceData.data1[0].Body_Type.splice(index, 1)
        }

        this.toastr.successToastr(data.message, "Succsess!")
        this.closeDeletedConfrimPopUp();
        $('#deletePopup').show();
      }, error => console.log('From error = ' + error));
  }

  /*   Common service call for delete with put request */
  commonCallForMaintance(url: any, parameters, index) {
    console.log("index = " + index);
    this.maintenanceService.MaintanceData(url, parameters)
      .subscribe((data) => {
        if (data.msg == 'error') {
          this.toastr.errorToastr(data.info, data.msg);
          this.closeDeletedConfrimPopUp();
        }
        else {
          /*    Remove data from display   */
          console.log("Maintenance KEY = " + this.FromVehicleChildData.maintance_key);
          if (this.FromVehicleChildData.maintance_key == "body_type") {
            this.maintenanceData.data1[0].Body_Type.splice(index, 1);

          }
          if (this.FromVehicleChildData.maintance_key == "transmission_type") {
            this.maintenanceData.data2[1].Transmission_Type.splice(index, 1);

          }
          if (this.FromVehicleChildData.maintance_key == "fuel_type") {
            this.maintenanceData.data2[2].Fuel_Type.splice(index, 1)

          }
          if (this.FromVehicleChildData.maintance_key == "engine_type") {
            this.maintenanceData.data2[3].Engine_Type.splice(index, 1);

          }
          this.toastr.successToastr(data.info, "Success!");
          this.closeDeletedConfrimPopUp();
        }

      }, error => {
        console.log(error);
        this.toastr.errorToastr("Something went wrong..", "Oops!");
      })
  }

  /*   DELETE ends Here   */


  /*  Update Start here  */
  reciveData(data) {
    this.isBodyTypeEdit = false;
    this.isUpdated = false;
    this.dropdownData = '';
    this.fromChildComponent = data;
    console.log(this.fromChildComponent)
    
    if (this.fromChildComponent.maintance_key == "body_type") {
      this.imageForEdit = environment.base_url + this.fromChildComponent.maintenance_image;
      this.editTypeSelect = 'Body Type';
      this.BodyType = this.formBuilder.group({
        maintance_key: ['body_type'],
        maintance_value: [this.fromChildComponent.maintance_value, Validators.required],
        maintenance_image: [ ],
        maintance_id: [this.fromChildComponent.maintance_id, Validators.required]
      });
      this.API_URL = environment.base_url + '/Admin/Maintance/updateBodyType';
    }
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
      if(this.fromChildComponent.maintance_key == "engine_type"){
        this.editTypeSelect = 'Engine type';
        this.common();
        this.API_URL = environment.base_url + '/Admin/Maintance/updateMaintanceData'
      }else if(this.fromChildComponent.maintance_key == "fuel_type"){
        this.editTypeSelect = 'Fuel type';
        this.common();
        this.API_URL = environment.base_url + '/Admin/Maintance/updateMaintanceData'
      }else if(this.fromChildComponent.maintance_key == "transmission_type"){
        this.editTypeSelect = 'Transmission type';
        this.common();
        this.API_URL = environment.base_url + '/Admin/Maintance/updateMaintanceData'
      }
     
    }


  }

  common(){
    this.UpdateForm = this.formBuilder.group({
      maintance_id: [this.fromChildComponent.maintance_id, Validators.required],
      maintance_value: [this.fromChildComponent.maintance_value, Validators.required]
    });
  }



  get updateF() {
    return this.UpdateForm.controls
  }

  forBodyType(event) {
    if (event.target.files && event.target.files[0]) {
      this.imageUrl = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageForEdit = reader.result;
      reader.readAsDataURL(this.imageUrl);
    }

  }

  callToService() {
    this.isUpdated = true;
    this.isBodyTypeEdit = true;
    $('.overlayDivLoader').show();
    if (this.editTypeSelect == 'Body Type') {
      let formData = new FormData();
      if (this.imageUrl) {
        formData.append('maintenance_image', this.imageUrl);
      } else {
        formData.append('maintenance_image', this.fromChildComponent.maintenance_image);
      }
      formData.append('maintance_key', 'body_type');
      formData.append('maintance_value', this.BodyType.value.maintance_value);
      formData.append('maintance_id', this.fromChildComponent.maintance_id);
      console.log(this.BodyType.value);
      console.log(this.BodyType.controls)
      this.maintenanceService.UpdateMaintanceData(this.API_URL, formData).subscribe(responseResult => {
        if (responseResult.status) {
          this.toastr.successToastr(responseResult.message, 'Success');
          this.isBodyTypeEdit = false
          if (!!responseResult.image_path)
            this.maintenanceData.data1[0].Body_Type[this.fromChildComponent.index].maintenance_image = responseResult.image_path;
            this.maintenanceData.data1[0].Body_Type[this.fromChildComponent.index].maintance_value = this.BodyType.value.maintance_value;
          this.CloseUpdatePopup();
        } else if (!responseResult.status) {
          $('.overlayDivLoader').hide();
          console.log(responseResult);



          /* ISSUE IS HERE IF WE TRIED TO SUBMIT TO DOESNT SHOW IMAGE */
          
          

          this.imageForEdit = responseResult.image_path



          this.toastr.errorToastr(responseResult.message, 'Oops!!');
        }
        $('.overlayDivLoader').hide();
        this.imageForEdit = null;
      }, error => {
        $('.overlayDivLoader').hide();
        console.log(error)
        this.toastr.errorToastr(error, "ERROR!!");
      });
    }

    if (this.editTypeSelect != 'Body Type') {
      if (this.UpdateForm.valid) {
        this.isUpdated = true;
        this.UpdateChildComponentData = this.UpdateForm.value;
        this.maintenanceService.UpdateMaintanceData(this.API_URL, this.UpdateForm.value).subscribe(data => {
          if (data.status === 0) {
            this.toastr.errorToastr(data.message, "Warning!")
            $('.overlayDivLoader').hide()
          }
          if (data.status === 1) {
            this.isUpdated = false
            // For model
            if (this.fromChildComponent.model_name) {
              this.updateData['before'] = this.fromChildComponent.model_name;
              this.updateData['after'] = this.UpdateChildComponentData.model_name;

              let model_name = this.UpdateChildComponentData.model_name
              this.maintenanceData.data1[2].Model[this.fromChildComponent.index].model_name = model_name;
               this.maintenanceData.data1[2].Model[this.fromChildComponent.index].make_id = this.UpdateForm.value.make_id;
            }
            // For make
            if (this.fromChildComponent.make_name) {
              this.updateData['before'] = this.fromChildComponent.make_name;
              this.updateData['after'] = this.UpdateChildComponentData.make_name;

              let make_name = this.UpdateChildComponentData.make_name;
              this.maintenanceData.data1[1].Make[this.fromChildComponent.index].make_name = make_name;
              this.maintenanceData.data1[1].Make[this.fromChildComponent.index].body_type_id =  this.UpdateForm.value.body_type_id
            }
            // For Year
            if (this.fromChildComponent.year_name) {
              this.updateData['before'] = this.UpdateChildComponentData.year_name;
              this.updateData['after'] = this.UpdateChildComponentData.year_name;

              let year_name = this.UpdateChildComponentData.year_name;
              this.maintenanceData.data1[3].Year[this.fromChildComponent.index].year_name = year_name;
              this.maintenanceData.data1[3].Year[this.fromChildComponent.index].model_id = this.UpdateForm.value.model_id;
            }
            // For Series
            if (this.fromChildComponent.series) {
              this.updateData['before'] = this.fromChildComponent.series;
              this.updateData['after'] = this.UpdateChildComponentData.series;

              let series = this.UpdateChildComponentData.series;
              this.maintenanceData.data2[0].Series[this.fromChildComponent.index].series = series;
              this.maintenanceData.data2[0].Series[this.fromChildComponent.index].year_id = this.UpdateForm.value.year_id;
            }
            $('.overlayDivLoader').hide();
            this.toastr.successToastr(data.message, 'Success!');
            this.CloseUpdatePopup();
            this.isUpdated = false
            $('#editPopup').show();
          }

        }, error => {
          $('.overlayDivLoader').hide();
          this.toastr.errorToastr('Oops!')
        });
      }
      if (this.UpdateForm.invalid) {
        $('.overlayDivLoader').hide();
      }
    }



  };

  /*  */
  OnSubmitUpdateForm() {
    if (this.editTypeSelect == 'Body Type') this.callToService();
    /* For Update Series */
    if (this.editTypeSelect == 'series') this.callToService();
    /* For Update Year */
    if (this.editTypeSelect == 'Year') this.callToService();
    /* For Update Model */
    if (this.editTypeSelect == 'Model') this.callToService();
    /* For Update Make */
    if (this.editTypeSelect == 'Make') this.callToService();
    /* For Update transmission-type && fuel-type && engine-type  */
    if (this.editTypeSelect == 'Engine type') this.commonService();

    if (this.editTypeSelect == 'Fuel type') this.commonService();

    if (this.editTypeSelect == 'Transmission type') this.commonService();
  }


updateInfo(){
  this.updateData['before'] = this.fromChildComponent.maintance_value;
  this.updateData['after'] = this.UpdateChildComponentData.maintance_value;
}

  commonService(){
    this.UpdateForm.value.maintance_id = this.fromChildComponent.maintance_id;
    if (this.UpdateForm.valid) {
      $('.overlayDivLoader').show();
      this.maintenanceService.UpdateMaintananceDataPUT(this.API_URL, this.UpdateForm.value).subscribe(data => {
        if (data.msg == 'error') {
          $('.overlayDivLoader').hide();
          this.toastr.errorToastr(data.info, data.msg);
        } else {
          this.UpdateChildComponentData = this.UpdateForm.value;
          if (this.fromChildComponent.maintance_key == "transmission_type") {
            this.updateInfo();
            let maintance_value = this.UpdateChildComponentData.maintance_value;
            this.maintenanceData.data2[1].Transmission_Type[this.fromChildComponent.index].maintance_value = maintance_value;
          }
          if (this.fromChildComponent.maintance_key == "fuel_type") {
            this.updateInfo();
            let maintance_value = this.UpdateChildComponentData.maintance_value;
            this.maintenanceData.data2[2].Fuel_Type[this.fromChildComponent.index].maintance_value = maintance_value;
          }
          if (this.fromChildComponent.maintance_key == "engine_type") {
            this.updateInfo();
            let maintance_value = this.UpdateChildComponentData.maintance_value;
            this.maintenanceData.data2[3].Engine_Type[this.fromChildComponent.index].maintance_value = maintance_value;
          }
          $('.overlayDivLoader').hide();
          this.toastr.successToastr(data.info, data.msg)
          this.CloseUpdatePopup();
          $('#editPopup').show();

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
