import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminMaintanceService } from '../admin-maintance.service';
import { find } from 'rxjs/operators';
declare var $: any;
@Component({
  selector: 'app-parts-category',
  templateUrl: './parts-category.component.html',
  styleUrls: ['./parts-category.component.css']
})
export class PartsCategoryComponent implements OnInit {
  popUpTitle: string;
  catPartForm: FormGroup;
  assignedPartForm: FormGroup;
  catPartFormStatus: number;
  selectedCategoryID: number;
  selectedCategoryName: string;
  categoryData = [];
  deleteData : any;
  deleteDataIndex : number;
  deleteTitle  : number;
  editDataIndex : string;
  partData = [];
  isSubmitted = false;
  saveUpdateButton : number;
  assignedParts = [];
  newAssignParts : any;
  selectedBodyCellID = 1;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrManager, private adminmaintainservice: AdminMaintanceService) { }

  ngOnInit() {
    $('.overlayDivLoader').show();
    $("#catPartsPopup").hide();
    $("#catPartDeletePopup").hide();
    $("#assignedPartsPopUp").hide();
    this.getCategories();
    this.createAssignedPartForm();
    this.getBodyCell(this.selectedBodyCellID);
  }

  /* Get Categories */
  getCategories() {
    this.adminmaintainservice.getCategories().subscribe((result: any) => {
      console.log(result)
      this.categoryData = result.result;
      $('.overlayDivLoader').hide();
      if(this.categoryData.length > 0)
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
  displayCartPartPopup(title, formStatus,buttonStatus) {
    this.saveUpdateButton = buttonStatus;
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
    if(this.editDataIndex)
      this.catPartForm.reset;
    this.editDataIndex = '';
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
  openDeletePopUp(deleteData,index,title){
    this.deleteData = deleteData;
    this.deleteDataIndex = index;
    this.deleteTitle = title;
    console.log(index);
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
        this.categoryData.splice(this.deleteDataIndex,1);
        this.closeDeletedConfrimPopUp();
      }
      else if(res.status == 0)
        this.toastr.errorToastr(res.message,'Oops!!');
      $('.overlayDivLoader').hide();
     },error=>{
      this.toastr.errorToastr(error,'Oops!!');
      $('.overlayDivLoader').hide();
     })
    }
    else if(this.deleteData.part_id && !this.deleteData.assigned_part_id){
      //delete part
      this.adminmaintainservice.updatePart({'is_delete':1,'part_id':this.deleteData.part_id}).subscribe((res:any)=>{
        if(res.status){
          this.toastr.successToastr(res.message,'Success');
          this.closeDeletedConfrimPopUp();
          this.partData.splice(this.deleteDataIndex,1);
        }
        else if(res.status == 0)
          this.toastr.errorToastr(res.message,'Oops!!');
        $('.overlayDivLoader').hide();
       },error=>{
        this.toastr.errorToastr(error,'Oops!!');
        $('.overlayDivLoader').hide();
       })
    }
    else if(this.deleteData.assigned_part_id){
      //delete assigned part
      this.adminmaintainservice.updateAssignedPart({'is_delete':1,'assigned_part_id':this.deleteData.assigned_part_id}).subscribe((res:any)=>{
        if(res.status){
          this.toastr.successToastr(res.message,'Success');
          this.closeDeletedConfrimPopUp();
          this.assignedParts.splice(this.deleteDataIndex,1);
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

  /* Edit Parts and Categories: START */

  //Edit Category
  openEditPopUp(editData,index,formStatus,buttonStatus){
    this.editDataIndex = index;
    if(formStatus == 1){
      this.displayCartPartPopup('Edit Category', formStatus,buttonStatus)
      this.catPartForm.controls['category_name'].setValue(editData.category_name);
      this.catPartForm.addControl('category_id', new FormControl(editData.category_id, Validators.required));
    }
    else if(formStatus == 2){
      this.displayCartPartPopup('Edit Part', formStatus,buttonStatus)
      this.catPartForm.controls['part_name'].setValue(editData.part_name);
      this.catPartForm.controls['category_id'].setValue(editData.category_id);
      this.catPartForm.addControl('part_id', new FormControl(editData.part_id, Validators.required));
    }
    
  }

  //Update category & Parts
  updateCatParts(){
    var formData = this.catPartForm.value;
    this.isSubmitted = true;
    if (this.catPartForm.invalid)
      return false;
    this.isSubmitted = false;
    $('.overlayDivLoader').show();
    if(formData.category_id && !formData.part_id){
      this.adminmaintainservice.updateCategory(formData).subscribe((result:any)=>{
        console.log(result);
        if(result.status){
          this.categoryData[this.editDataIndex].category_name = formData.category_name;
          this.toastr.successToastr(result.message,'Success');
          this.editDataIndex = '';
          $("#catPartsPopup").hide();
          this.catPartForm.reset();
        }else{
          this.toastr.errorToastr(result.message,'Oops!!');
        }        
        $('.overlayDivLoader').hide();
      },error=>{
        this.toastr.errorToastr(error,'Oops!!');
        $('.overlayDivLoader').hide();
      })
    }else if(formData.category_id && formData.part_id){

      this.adminmaintainservice.updatePart(formData).subscribe((result:any)=>{
        console.log(result);
        if(result.status){
          this.partData[this.editDataIndex].part_name = formData.part_name;
          this.toastr.successToastr(result.message,'Success');
          this.editDataIndex = '';
          $("#catPartsPopup").hide();
          this.catPartForm.reset();
        }else{
          this.toastr.errorToastr(result.message,'Oops!!');
        }        
        $('.overlayDivLoader').hide();
      },error=>{
        this.toastr.errorToastr(error,'Oops!!');
        $('.overlayDivLoader').hide();
      })
    }
    
  }
  /* Edit Parts and Categories: END */

  /* Assigned Parts: START */
  getBodyCell(_this) {
    this.selectedBodyCellID = _this;    
    this.createAssignedPartForm();    
    console.log("_this = "+_this);
    console.log("selectedBodyCellID = "+this.selectedBodyCellID);
    $('.overlayDivLoader').show();
    $('#bodyCell').find('.active').removeClass('active');
    $('#'+_this).addClass('active');
    this.adminmaintainservice.getAssignedParts(_this).subscribe((result:any)=>{
      console.log(result);
      this.assignedParts=result.assignedParts;
      $('.overlayDivLoader').hide();
    })
   }

  //SAve assigned parts
  openAssignedPopUp(){
    $("#assignedPartsPopUp").show();
  }

  closeAssignedPopUp(){
    this.assignedPartForm.reset();
    $("#assignedPartsPopUp").hide();
  }

  //create new form for assigned parts
  createAssignedPartForm(){
    this.assignedPartForm = this.formBuilder.group({
      part_id:['',Validators.required],
      category_id:['',Validators.required],
      car_body_cell_id: [this.selectedBodyCellID,Validators.required]
    })
  }
  get catPartAssignF(){
    return this.assignedPartForm.controls;
  }

  /* Display Parts as per Category */
  getNewAssignPartPerCategory() {
    let category_id = this.assignedPartForm.value.category_id;
    this.assignedPartForm.controls['part_id'].setValue('');
    console.log(category_id);
    $('.overlayDivLoader').show();
    this.adminmaintainservice.getPartByCategoryID(category_id).subscribe((res: any) => {
      this.newAssignParts = res.parts;
      $('.overlayDivLoader').hide();
    }, error => {
      console.log(error);
      $('.overlayDivLoader').hide();
    })
  }

  /* Save Assigned Parts */
  saveAssignedParts(){
    this.isSubmitted = true;
    if(this.assignedPartForm.invalid)
      return false;
    $('.overlayDivLoader').show();
    this.isSubmitted = false;
    console.log(this.assignedPartForm.value);
    this.adminmaintainservice.saveAssignedParts(this.assignedPartForm.value).subscribe((result:any)=>{
      console.log(result);
      if(result.status){
        this.toastr.successToastr(result.message, 'Success');
        this.getBodyCell(this.selectedBodyCellID);
        this.closeAssignedPopUp();
      }else{
        this.toastr.errorToastr(result.message, 'Oops!!');
      }
      $('.overlayDivLoader').hide();
    },error=>{
      this.toastr.errorToastr(error, 'Oops!!');
      this.assignedPartForm.reset;
    })
  }

  /* open Update form popup */
  openAssignUpdateFormPopUp(editData){
    this.createAssignedPartForm();
    this.assignedPartForm.addControl('assigned_part_id', new FormControl(editData.assigned_part_id, Validators.required));
    this.assignedPartForm.controls['category_id'].setValue(editData.category_id);
    this.getNewAssignPartPerCategory();
    this.assignedPartForm.controls['part_id'].setValue(editData.part_id);
    this.openAssignedPopUp();
  }

  /* Update the Assigned Parts */
  updateAssignedPart(){
    this.isSubmitted = true;
    if(this.assignedPartForm.invalid)
      return false;
    $('.overlayDivLoader').show();
    this.isSubmitted = false;
    this.adminmaintainservice.updateAssignedPart(this.assignedPartForm.value).subscribe((res:any)=>{
      if(res.status){
        this.toastr.successToastr(res.message,'Success');
        this.closeAssignedPopUp();
        this.getBodyCell(this.selectedBodyCellID);
      }
      else if(res.status == 0)
        this.toastr.errorToastr(res.message,'Oops!!');
      $('.overlayDivLoader').hide();
      },error=>{
      this.toastr.errorToastr(error,'Oops!!');
      $('.overlayDivLoader').hide();
      })
  }
  /* Assigned Parts: END */
  
}
