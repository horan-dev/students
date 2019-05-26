import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ClassroomService } from '../../services/classroom.service';
import { ConfirmationDialogComponent } from '../../components/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-classroom-students',
  templateUrl: './classroom-students.component.html',
  styleUrls: ['./classroom-students.component.css']
})
export class ClassroomStudentsComponent implements OnInit {

  classroomID=""
    searchValue=""
    classrooms={}
    students:any[];
    constructor( public flashMessagesService : FlashMessagesService, public studentService : StudentService,public classroomService : ClassroomService,public dialog: MatDialog
      , private route: ActivatedRoute, private router: Router) { 

        this.classroomID=this.route.snapshot.params['classroomID'];
        console.log(this.classroomID);
      console.log(this.classrooms);
      let temp=[]
      this.studentService.getClassroomStudents(this.classroomID).subscribe(s =>{
      
        console.log(s);
    
        this.students = s;
       console.log(this.students);
       
      },err=>{
        console.log(err)
     
      });
      
    }
    
    ngOnInit() {
  
    }
    deleteStudent(id){
      if(confirm("Are you sure ! :(")){
      console.log(id);
      this.studentService.deleteStudent(id).subscribe((result) => {
        let temp=[]
        for (let index = 0; index < this.students.length; index++) {
          if (this.students[index].id!==id){
            temp.push(this.students[index])
          }
          
        }
        this.students=temp;
        this.flashMessagesService.show("Student Deleted successfully !  ",{cssClass:'alert-success',timeout:3000});
     
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
  
    search(event: any) {
      let temp = []
      this.searchValue= event.target.value ;
      if(this.searchValue){
        this.studentService.search(this.searchValue).subscribe((result) => {
          // for (let index = 0; index <result.length; index++) {
          //   const element =result[index];
          //   element["classroom"]=this.classrooms[element.classroomId]
          //   temp.push(element);
          // }
         
          this.students = result;
        }, (err) => {
       
        });
      }
      else{
     
        this.studentService.getClassroomStudents(this.classroomID).subscribe(s =>{
          // for (let index = 0; index < s.length; index++) {
          //   const element = s[index];
          //   element["classroom"]=this.classrooms[element.classroomId]
          //   temp.push(element);
          // }
         
          this.students = s;
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
  
 
  }