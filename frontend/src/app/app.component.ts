import {Component, OnInit, DoCheck, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'Appointment-Manager';

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef
) {   }

  ngOnInit() {
  }

  ngDoCheck(){
  }
}
