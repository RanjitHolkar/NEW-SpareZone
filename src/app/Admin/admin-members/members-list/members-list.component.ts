import { Component, OnInit } from '@angular/core';
import { MembersListService } from './members-list.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
public groupType:any;
public states:any;
  constructor(private membersListService:MembersListService) { }

  ngOnInit() {
    this.membersListService.getGroups().subscribe(res=>{
      this.groupType = res.supplierGroups;
    })
    this.membersListService.getStates().subscribe(res=>{
      this.states =res.states;
    })
  }

}
