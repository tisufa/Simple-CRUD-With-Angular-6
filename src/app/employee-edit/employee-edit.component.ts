import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  @Input() employee:any = { id: '', name: '', department:''};

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getEmployee(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.employee = data;
    });
  }

  updateEmployee(id) {
    this.rest.updateEmployee(id, this.employee).subscribe((result) => {
      this.router.navigate(['/employee-details/' + this.employee.id]);
    }, (err) => {
      console.log(err);
    });
  }

  back(){
    this.router.navigate(['/employees']);
  }

  deleteEmployee(id) {
    this.rest.deleteEmployee(id)
      .subscribe(res => {
          this.router.navigate(['/employees']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}