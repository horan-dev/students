import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../../services/classroom.service';
import { StudentService } from '../../services/Student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';

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
  constructor(public studentService : StudentService,public classroomService : ClassroomService, private route: ActivatedRoute, private router: Router, public flashMessagesService:FlashMessagesService,) {
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
  save(){
    console.log("this.student");
    console.log(this.student);
    this.studentService.updateStudent(this.id,this.student).subscribe((result) => {
      // this.router.navigate(['students']);
      // console.log("save");
    }, (err) => {
      // this.flashMessagesService.show('Please write correct info',{cssClass:'alert-danger',timeout:6000});
      // this.router.navigate(['students/edit/'+this.id]);
    });
    // this.flashMessagesService.show('Employee updated successfully !',{cssClass:'alert-success',timeout:6000});

  }
  

}

