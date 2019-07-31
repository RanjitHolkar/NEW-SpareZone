import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-parts-category',
  templateUrl: './parts-category.component.html',
  styleUrls: ['./parts-category.component.css']
})
export class PartsCategoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $("#catPartsPopup").hide();
  }
  getBodyCell(_this){
    console.log(_this);
  }
}
