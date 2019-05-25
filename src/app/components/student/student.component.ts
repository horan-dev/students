import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ClassroomService } from '../../services/classroom.service';


import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../components/shared/confirmation-dialog/confirmation-dialog.component';
// import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  searchValue=""
  classrooms={}
  students:any[];
  constructor( public studentService : StudentService,public classroomService : ClassroomService,public dialog: MatDialog) { 
    if (this.isEmptyObject(this.classrooms)){
      console.log("inside");
      this.classroomService.getClassrooms().subscribe(classrooms =>{
        for (let index = 0; index < classrooms.length; index++) {
          this.classrooms[classrooms[index].id]=classrooms[index];
          // this.classrooms[classrooms[index].id]="ahmad";
        }
  
      });
      
    }

    console.log("classrooms");
    console.log(this.classrooms);
    let temp=[]
    this.studentService.getStudents().subscribe(s =>{
      for (let index = 0; index < s.length; index++) {
        const element = s[index];
        element["classroom"]=this.classrooms[element.classroomId]
        temp.push(element);
      }
     
      this.students = temp;
     console.log(this.students);
     
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
        for (let index = 0; index <result.length; index++) {
          const element =result[index];
          element["classroom"]=this.classrooms[element.classroomId]
          temp.push(element);
        }
       
        this.students = temp;
      }, (err) => {
     
      });
    }
    else{
   
      this.studentService.getStudents().subscribe(s =>{
        for (let index = 0; index < s.length; index++) {
          const element = s[index];
          element["classroom"]=this.classrooms[element.classroomId]
          temp.push(element);
        }
       
        this.students = temp;
       console.log(this.students);
       
      });
    }
    }
  
    openDialog(id): void {

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        // height:"800px",
        // width: '350px',
        panelClass: 'my-centered-dialog',
        width: '512px',
        // position:ScreenOrientation,
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

  // public openConfirmationDialog() {
  //   this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
  //   .then((confirmed) => console.log('User confirmed:', confirmed))
  //   .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  // }
}
