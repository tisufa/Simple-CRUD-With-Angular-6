import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees:any = [];

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employees = [];
    this.rest.getEmployees().subscribe((data: {}) => {
      this.employees = data;
    });
  }

  add() {
    this.router.navigate(['/employee-add']);
  }

  editEmployee(id){
    this.router.navigate(['/employee-edit/'+ id]);
  }

}