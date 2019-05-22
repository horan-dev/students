import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../../services/classroom.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-classroom',
  templateUrl: './edit-classroom.component.html',
  styleUrls: ['./edit-classroom.component.css']
})
export class EditClassroomComponent implements OnInit {
  id=""
  classroom={
    id:"",
    name :"",
    school :""
  };
  constructor(public classroomService : ClassroomService, private route: ActivatedRoute, private router: Router) {
  this.id=this.route.snapshot.params['id'];
    this.classroomService.getByID(this.id).subscribe((result) => {

      this.classroom=result;

    }, (err) => {
      console.log(err);
    });
   }
 
  ngOnInit() {
  }
  add(){
    this.classroomService.updateClassroom(this.id,this.classroom).subscribe((result) => {

      console.log("save");
    }, (err) => {
      console.log(err);
    });
  }
  

}
