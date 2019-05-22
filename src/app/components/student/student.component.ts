import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students:any[];
  constructor( public studentService : StudentService) { 
    this.studentService.getStudents().subscribe(s =>{
      this.students = s;
     console.log(s);
     
    });
    
  }
  
  ngOnInit() {

  }
  deleteStudent(id){
    console.log(id);
    this.studentService.deleteStudent(id).subscribe((result) => {
      let temp=[]
      for (let index = 0; index < this.students.length; index++) {
        if (this.students[index].id!==id){
          temp.push(this.students[index])
        }
        
      }
      this.students=temp;
      console.log("deleted");
    }, (err) => {
      console.log("error");
      console.log(err);
    });
  }

}
