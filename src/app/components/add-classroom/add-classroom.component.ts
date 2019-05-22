import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../../services/classroom.service';
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
  constructor(public classroomService : ClassroomService) { }

  ngOnInit() {
  }
  add(){
    this.classroomService.createClassroom(this.classroom).subscribe((result) => {

      console.log("add");
    }, (err) => {
      console.log(err);
    });
  }
  

}
