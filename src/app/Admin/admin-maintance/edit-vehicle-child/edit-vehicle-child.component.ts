import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { AdminMaintanceService } from '../admin-maintance.service';
declare var $: any;


@Component({
  selector: 'app-edit-vehicle-child',
  templateUrl: './edit-vehicle-child.component.html',
  styleUrls: ['./edit-vehicle-child.component.css']
})
export class EditVehicleChildComponent implements OnInit {
  
// From child component to parent component
   @Output() valueSelected = new EventEmitter();
   @Output() editData = new EventEmitter();


  
  // From parent component
  @Input() maintanData: any;
  constructor(private service: AdminMaintanceService) { }
  ngOnInit() {
    this.maintanData = this.maintanData[this.maintanData.name];
  }
  // ClosePopUp() {
  //   $("#myModal").modal("hide");

  // }
  OpenPopUp(data){
  console.log(data)
  $('#myupdate').modal('show');
  }
 

   /* Display Delete popup */
   displayDeleteConfrimPopUp(data:any){
    $('#maintainDeletePopup').show();
     this.valueSelected.emit(data);
  }

  /* Close Delete popup */
  closeDeletedConfrimPopUp(){
    $('#maintainDeletePopup').hide();
    // console.log()
    // console.log(this.valueSelected)
  }

  editPopup(data){
    this.editData = data;
   
  }
}
