import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../../services/classroom.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-classroom',
  templateUrl: './add-classroom.component.html',
  styleUrls: ['./add-classroom.component.css']
})
export class AddClassroomComponent implements OnInit {


  classroom={
    id:"",
    name :"",
    school :""
  };
  constructor(public classroomService : ClassroomService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }
  add(){
    this.classroomService.createClassroom(this.classroom).subscribe((result) => {
      this.router.navigate(['classrooms']);
      console.log("add");
    }, (err) => {
      this.router.navigate(['classroom/create']);
      console.log(err);
    });
  }
  

}
