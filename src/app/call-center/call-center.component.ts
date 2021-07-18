import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-call-center',
  templateUrl: './call-center.component.html',
  styleUrls: ['./call-center.component.css']
})
export class CallCenterComponent implements OnInit {

  searchTermFormControl: FormControl;

  constructor() {
    this.searchTermFormControl = new FormControl(null);
  }

  ngOnInit(): void {
  }

}
