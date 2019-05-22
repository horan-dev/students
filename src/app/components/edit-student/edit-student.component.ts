import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../../services/classroom.service';
import { StudentService } from '../../services/Student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  id=""
  student={
    id:"",
    name :"",
    surename :"",
    classroomId:""
  };
  classrooms=[]
  constructor(public studentService : StudentService,public classroomService : ClassroomService, private route: ActivatedRoute, private router: Router) {
  this.id=this.route.snapshot.params['id'];
    this.studentService.getByID(this.id).subscribe((result) => {

      this.student=result;

    }, (err) => {
      console.log(err);
    });


    this.classroomService.getClassrooms().subscribe(classrooms =>{
      this.classrooms = classrooms;
     console.log(classrooms);
     
   });
   }
 
  ngOnInit() {
  }
  add(){
    this.studentService.updateStudent(this.id,this.student).subscribe((result) => {

      console.log("save");
    }, (err) => {
      console.log(err);
    });
  }
  

}

