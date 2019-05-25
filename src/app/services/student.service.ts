import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  endpoint="http://127.0.0.1:3000"
  constructor(public http:Http) {

   }
   search(val){
    console.log(this.endpoint);
     return this.http.get
     (this.endpoint+'/students/search/'+val)
       .map(res=>res.json(),err=>{
         console.log(err);
       })
     ;
    
   }

  getStudents(){
    console.log(this.endpoint);
     return this.http.get
     (this.endpoint+'/students')
       .map(res=>res.json(),err=>{
         console.log(err);
       })
     ;
    
   }

   getClassroomStudents(classroomId){

    console.log(this.endpoint);
    console.log(classroomId);
     return this.http.get
     (this.endpoint+'/classroom/students/'+classroomId)
       .map(res=>res.json(),err=>{
         console.log(err);
       })
     ;
    
   }
   deleteStudent(id){
    return this.http.delete
    (this.endpoint+'/student/'+ id )
    .map(res=>res.json())
    ;
   }

   getByID(id){
    return this.http.get
    (this.endpoint+'/student/'+ id )
    .map(res=>res.json())
    ;
   }

   createStudent(s){
    return this.http.post
    (this.endpoint+'/student/',s )
    .map(res=>res.json())
    ;
   }
   updateStudent(id,student){
    return this.http.put
    (this.endpoint+'/student/'+id,student )
    .map(res=>res.json())
    ;
   }
}
