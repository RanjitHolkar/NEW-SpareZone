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
  @Input() updateEdit:any;
  dataFromChild:any;
  @Output() updateEditDataFromChild:any;
  constructor() { }
  ngOnInit() {
    this.maintanData = this.maintanData[this.maintanData.name1];

  }

   /* Display Delete popup */
   displayDeleteConfrimPopUp(data:any,index){
    $('#maintainDeletePopup').show();
    data['index'] = index;
     this.valueSelected.emit(data);
  }

  /* Close Delete popup */
  closeDeletedConfrimPopUp(){
    $('#maintainDeletePopup').hide();
  }
  
  displayUpdatePopUp(update:any,index){
    update['index'] = index;
    this.editData.emit(update);
    $('#UpdatePopup').show();
  }

  CloseUpdatePopup(){
    $('#UpdatePopup').hide();
  
  }

 
}
