import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../../services/classroom.service';
import { StudentService } from '../../services/student.service';
import { ReactiveFormsModule,FormGroup,FormBuilder } from '@angular/forms';
import { FlashMessagesService} from 'angular2-flash-messages';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  student={
    id:"",
    name :"",
    surename :"",
    classroomId :"",
    classroom :""
  };
  classForm: FormGroup;
  classrooms=[]
  constructor(public fashMessagesService : FlashMessagesService,public studentService : StudentService,public classroomService : ClassroomService, private route: ActivatedRoute, private router: Router) {
    this.classroomService.getClassrooms().subscribe(classrooms =>{
      this.classrooms = classrooms;
     console.log(classrooms);
     
   });
 
  }

  ngOnInit() {
  
  }
  add(){
    console.log("aww");
    console.log(this.student)
    this.studentService.createStudent(this.student).subscribe((result) => {
      this.router.navigate(['students']);
      console.log("add");
      this.fashMessagesService.show('Thanks new student added successfully !',{cssClass:'alert-success',timeout:6000});
    }, (err) => {
      this.router.navigate(['student/create']);
      console.log(err);
    });
  }
  

}
