import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminSettingService } from '../admin-setting.service';
import { ToastrManager } from 'ng6-toastr-notifications'
@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.css']
})
export class GeneralSettingComponent implements OnInit {
  generalSettingData: any;
  public generalSettingForm: FormGroup;
  isGSettingSubmitted = false;
  terms_file: any;
  terms_fileURL: any;
  constructor(private formBuilder: FormBuilder, private AdminService: AdminSettingService, private toastr: ToastrManager) { }

  ngOnInit() {
    this.createGeneralSettingFrom();
    this.getGeneralSettingData();

  }

  /* Get general setting data */
  getGeneralSettingData() {
    this.AdminService.getGeneralSetting().subscribe((response: any) => {
      this.generalSettingData = response.generalSetting;
      console.log(response);
      this.setGeneralValues();
    })
  }

  /* Set the values to general form */
  setGeneralValues() {
    if (this.generalSettingData) {
      this.generalSettingForm.controls['setting_id'].setValue(this.generalSettingData.setting_id);
      this.generalSettingForm.controls['sub_charges'].setValue(this.generalSettingData.sub_charges);
      this.generalSettingForm.controls['ord_commession'].setValue(this.generalSettingData.ord_commession);
      this.generalSettingForm.controls['invoice_terms'].setValue(this.generalSettingData.invoice_terms);
      this.generalSettingForm.controls['gst_rate'].setValue(this.generalSettingData.gst_rate);
      this.generalSettingForm.controls['reIssue_after'].setValue(this.generalSettingData.reIssue_after);
      this.generalSettingForm.controls['due_days'].setValue(this.generalSettingData.due_days);
      this.generalSettingForm.controls['terms_file'].setValue(this.generalSettingData.terms_file);
      this.generalSettingForm.controls['acknowleg_statement'].setValue(this.generalSettingData.acknowleg_statement);
      this.generalSettingForm.controls['supplier_min_limit'].setValue(this.generalSettingData.supplier_min_limit);
      this.generalSettingForm.controls['supplier_max_limit'].setValue(this.generalSettingData.supplier_max_limit);
     }

  }

  createGeneralSettingFrom() {
    this.generalSettingForm = this.formBuilder.group({
      setting_id: ['', Validators.required],
      sub_charges: ['', Validators.required],
      ord_commession: ['', Validators.required],
      invoice_terms: ['', Validators.required],
      gst_rate: ['', Validators.required],
      reIssue_after: ['', Validators.required],
      due_days: ['', Validators.required],
      terms_file: ['', Validators.required],
      acknowleg_statement: ['', Validators.required],
      supplier_min_limit: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      supplier_max_limit: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })

  }

  get gSettingF() {
    return this.generalSettingForm.controls
  }

  /* Profile image preview */
  profileImagePreview(event) {
    if (event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.terms_fileURL = e.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.terms_file = event.target.files[0];
    }
  }

  /* Update the general setting */
  updateGeneralSetting() {
    this.isGSettingSubmitted = true;
    if (this.generalSettingForm.valid) {
      this.isGSettingSubmitted = false;
      const formData = new FormData();
      formData.append('setting_id', this.generalSettingForm.value.setting_id);
      formData.append('sub_charges', this.generalSettingForm.value.sub_charges);
      formData.append('ord_commession', this.generalSettingForm.value.ord_commession);
      formData.append('invoice_terms', this.generalSettingForm.value.invoice_terms);
      formData.append('gst_rate', this.generalSettingForm.value.gst_rate);
      formData.append('reIssue_after', this.generalSettingForm.value.reIssue_after);
      formData.append('due_days', this.generalSettingForm.value.due_days);
      formData.append('acknowleg_statement', this.generalSettingForm.value.acknowleg_statement);
      formData.append('supplier_min_limit', this.generalSettingForm.value.supplier_min_limit);
      formData.append('supplier_max_limit', this.generalSettingForm.value.supplier_max_limit);
      if(!!this.terms_file)
        formData.append('terms_file', this.terms_file);
      this.AdminService.updateGeneralSetting(formData).subscribe((response: any) => {
        console.log(response);
        if (!response.status)
          this.toastr.errorToastr(response.message, 'Oops!');
        else if(response.status)
          this.toastr.successToastr(response.message, 'Success!');
      }, error => {
        console.log(error)
        this.toastr.errorToastr(error, 'Oops!');
      })
    } else {
      return false;
    }
  }

}
