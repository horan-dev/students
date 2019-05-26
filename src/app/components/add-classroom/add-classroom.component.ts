import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../../services/classroom.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from "angular2-flash-messages";

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
  constructor(public fashMessagesService : FlashMessagesService,public classroomService : ClassroomService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }
  add({value,valid}){
    console.log("value");
    console.log(value);
    if (!valid) {
      
      this.fashMessagesService.show('Please write correct info',{cssClass:'alert-danger',timeout:6000});
     // console.log("not correct data");
    }
    else{

   
    this.classroomService.createClassroom(this.classroom).subscribe((result) => {
      this.router.navigate(['classrooms']);
      console.log("add");
      this.fashMessagesService.show('Thanks new classroom added successfully !',{cssClass:'alert-success',timeout:6000});
   
    }, (err) => {
      this.router.navigate(['classroom/create']);
      console.log(err);
    });
  }
}

}
