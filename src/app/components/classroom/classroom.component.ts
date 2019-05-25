import { Component, OnInit } from '@angular/core';
 import { ClassroomService } from '../../services/classroom.service';
 import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  classrooms:any[];
  searchValue=""
  constructor( public classroomService : ClassroomService, private route: ActivatedRoute, private router: Router
    , public flashMessagesService:FlashMessagesService) { 
    this.classroomService.getClassrooms().subscribe(classrooms =>{
      this.classrooms = classrooms;
     console.log(classrooms);
     
    });
    
  }
  
  ngOnInit() {

  }
  deleteClassroom(id){
    if(confirm("Are you sure ! :(")){
    console.log(id);
    this.classroomService.deleteClassRoom(id).subscribe((result) => {
      let temp=[]
      for (let index = 0; index < this.classrooms.length; index++) {
        if (this.classrooms[index].id!==id){
          temp.push(this.classrooms[index])
        }
        
      }
      this.classrooms=temp;
      console.log("deleted");
      this.flashMessagesService.show("Student Deleted successfully !  ",{cssClass:'alert-success',timeout:6000});
     
    }, (err) => {
      this.flashMessagesService.show('this class related with students',{cssClass:'alert-danger',timeout:6000});
      this.router.navigate(['classrooms']);
      console.log("error");
      console.log(err);
    });
    this.router.navigate(['classrooms']);
    // this.flashMessagesService.show('this class related with students',{cssClass:'alert-danger',timeout:12000});
    // this.router.navigate(['classrooms']);
  }}


  students(classroomID){
 console.log(classroomID)
    this.router.navigate(['classrooms/'+classroomID+'/students']);

  }

}
