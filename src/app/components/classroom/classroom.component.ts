import { Component, OnInit } from '@angular/core';
 import { ClassroomService } from '../../services/classroom.service';
@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  classrooms:any[];
  constructor( public classroomService : ClassroomService) { 
    this.classroomService.getClassrooms().subscribe(classrooms =>{
      this.classrooms = classrooms;
     console.log(classrooms);
     
    });
    
  }
  
  ngOnInit() {

  }
  deleteClassroom(id){
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
    }, (err) => {
      console.log("error");
      console.log(err);
    });
  }

}
