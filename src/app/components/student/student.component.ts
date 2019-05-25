import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ClassroomService } from '../../services/classroom.service';

import { FlashMessagesService} from 'angular2-flash-messages';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../components/shared/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  searchValue=""
  classrooms={}
  students:any[];
  constructor( public flashMessagesService : FlashMessagesService,public studentService : StudentService,public classroomService : ClassroomService,public dialog: MatDialog) { 
  
    // if (this.isEmptyObject(this.classrooms)){
    //   console.log("inside");
    //   this.classroomService.getClassrooms().subscribe(classrooms =>{
    //     for (let index = 0; index < classrooms.length; index++) {
    //       this.classrooms[classrooms[index].id]=classrooms[index];
    //     }
  
    //   });
      
    // }

    // console.log("classrooms");
    // console.log(this.classrooms);
    // let temp=[]
    this.studentService.getStudents().subscribe(s =>{

     
      this.students = s;
     console.log(this.students);
     
    });
    
  }
  
  ngOnInit() {

  }
  deleteStudent(id){
    console.log(id);
    if(confirm("Are you sure ! :(")){
    this.studentService.deleteStudent(id).subscribe((result) => {
      let temp=[]
      for (let index = 0; index < this.students.length; index++) {
        if (this.students[index].id!==id){
          temp.push(this.students[index])
        }
        
      }
      this.students=temp;
      this.flashMessagesService.show("Student Deleted successfully !  ",{cssClass:'alert-success',timeout:6000});
     
      console.log("deleted");
    }, (err) => {
      console.log("error");
      console.log(err);
    });
  }
  }


   isEmptyObject(obj) {
    for (var key in obj) {
      return false;
    }
    return true;
  }

  search(){
    let temp=[]
    if(this.searchValue){
      this.studentService.search(this.searchValue).subscribe((result) => {

        this.students = result;
      }, (err) => {
     
      });
    }
    else{
   
      this.studentService.getStudents().subscribe(s =>{

       
        this.students = s;
       console.log(this.students);
       
      });
    }
    }
  
    openDialog(id): void {

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      
        panelClass: 'my-centered-dialog',
        width: '512px',
        // padding-left: 0,
        data: "Do you confirm the deletion of this data?"
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          console.log('Yes clicked');
          console.log(id);
          this.deleteStudent(id);
          // DO SOMETHING
        }
      });
    }


}
