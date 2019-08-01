import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminMaintanceService } from '../admin-maintance.service';
declare var $: any;
@Component({
  selector: 'app-parts-category',
  templateUrl: './parts-category.component.html',
  styleUrls: ['./parts-category.component.css']
})
export class PartsCategoryComponent implements OnInit {
  popUpTitle: string;
  catPartForm: FormGroup;
  catPartFormStatus: number;
  selectedCategoryID: number;
  selectedCategoryName: string;
  categoryData = [];
  deleteData : any;
  deleteDataIndex : number;
  partData = [];
  isSubmitted = false;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrManager, private adminmaintainservice: AdminMaintanceService) { }

  ngOnInit() {
    $('.overlayDivLoader').show();
    $("#catPartsPopup").hide();
    $("#catPartDeletePopup").hide();
    this.getCategories();
  }

  /* Get Categories */
  getCategories() {
    this.adminmaintainservice.getCategories().subscribe((result: any) => {
      this.categoryData = result.result;
      $('.overlayDivLoader').hide();
      this.getPartPerCategory(this.categoryData[0]);
    })
  }
  /* Display Parts as per Category */
  getPartPerCategory(categoryData) {
    $('.overlayDivLoader').show();
    this.selectedCategoryID = categoryData.category_id;
    this.selectedCategoryName = categoryData.category_name;
    this.adminmaintainservice.getPartByCategoryID(this.selectedCategoryID).subscribe((res: any) => {
      this.partData = res.parts;
      $('.overlayDivLoader').hide();
    }, error => {
      console.log(error);
      $('.overlayDivLoader').hide();
    })

  }

  /* Display popUp */
  displayCartPartPopup(title, formStatus) {
    this.isSubmitted = false;
    this.popUpTitle = title;
    if (formStatus === 1) {
      this.createCatPartForm(formStatus);
      $("#catPartsPopup").show();
    }
    else if (formStatus === 2 && this.selectedCategoryID) {
      this.createCatPartForm(formStatus);
      $("#catPartsPopup").show();
    }
    else
      this.toastr.errorToastr('Select the category', 'Oops!');
  }

  /* Close popUp */
  closeCartPartPopup() {
    $("#catPartsPopup").hide();
  }

  /* Create form
  formStatus =1 : CategoryForm
  formStatus =2 : PartsForm
   */
  createCatPartForm(formStatus) {
    this.catPartFormStatus = formStatus;
    if (formStatus === 1) {
      this.catPartForm = this.formBuilder.group({
        category_name: ['', Validators.required]
      })
    }
    else if (formStatus === 2) {
      if (this.selectedCategoryID) {
        this.catPartForm = this.formBuilder.group({
          category_id: [this.selectedCategoryID, Validators.required],
          part_name: ['', Validators.required]
        })
      }
      else
        this.toastr.errorToastr('Select the category', 'Oops!');
    }
  }

  /* Return Form Controls */
  get catPartF() {
    return this.catPartForm.controls
  }
  getBodyCell(_this) {
    console.log(_this);
  }

  /* Save Part & Ctaegories */
  savePartCategory() {
    this.isSubmitted = true;
    if (this.catPartForm.invalid)
      return false;
    $('.overlayDivLoader').show();
    this.isSubmitted = false;
    let formData = this.catPartForm.value;
    if (this.catPartFormStatus === 1) {
      this.adminmaintainservice.saveCategory(formData).subscribe((result: any) => {
        if (result.status) {
          this.catPartForm.reset;
          this.closeCartPartPopup();
          formData['category_id'] = result.category_id;
          this.categoryData.push(formData)
          this.toastr.successToastr(result.message, 'Success');
        }
        else
          this.toastr.errorToastr(result.message, 'Oops!!');
        $('.overlayDivLoader').hide();
      }, error => {
        $('.overlayDivLoader').hide();
        console.log(error);
      })
    }

    else if (this.catPartFormStatus === 2) {
      this.adminmaintainservice.saveParts(formData).subscribe((result: any) => {
        if (result.status) {
          this.catPartForm.reset;
          this.closeCartPartPopup();
          formData['part_id'] = result.part_id;
          this.partData.push(formData)
          this.toastr.successToastr(result.message, 'Success');
        }
        else
          this.toastr.errorToastr(result.message, 'Oops!!');
        $('.overlayDivLoader').hide();
      }, error => {
        $('.overlayDivLoader').hide();
        console.log(error);
      })
    }
  }

  /* Delete operations : START */
  //Display Popup
  openDeletePopUp(deleteData,index){
    this.deleteData = deleteData;
    this.deleteDataIndex = index;
    $("#catPartDeletePopup").show();
  }

  closeDeletedConfrimPopUp(){
    this.deleteData = '';
    this.deleteDataIndex;
    $("#catPartDeletePopup").hide();
  }

  //Delete the category or part
  deleteCatPart(){
    console.log(this.deleteData);
    $('.overlayDivLoader').show();
    if(this.deleteData.category_id && !this.deleteData.part_id){
      //delete category
     this.adminmaintainservice.updateCategory({'is_delete':1,'category_id':this.deleteData.category_id}).subscribe((res:any)=>{
      if(res.status){
        this.toastr.successToastr(res.message,'Success');
        this.categoryData.splice(this.deleteDataIndex);
        $("#catPartDeletePopup").hide();
      }
      else if(res.status == 0)
        this.toastr.errorToastr(res.message,'Oops!!');
      $('.overlayDivLoader').hide();
     },error=>{
      this.toastr.errorToastr(error,'Oops!!');
      $('.overlayDivLoader').hide();
     })
    }
    else if(this.deleteData.part_id){
      //delete part
      this.adminmaintainservice.updatePart({'is_delete':1,'part_id':this.deleteData.part_id}).subscribe((res:any)=>{
        if(res.status){
          this.toastr.successToastr(res.message,'Success');
          $("#catPartDeletePopup").hide();
          this.partData.splice(this.deleteDataIndex);
        }
        else if(res.status == 0)
          this.toastr.errorToastr(res.message,'Oops!!');
        $('.overlayDivLoader').hide();
       },error=>{
        this.toastr.errorToastr(error,'Oops!!');
        $('.overlayDivLoader').hide();
       })
    }
    console.log(this.deleteData.category_id);

    //if(this.deleteData)
  }
  /* Delete operations : END */
  
}
