import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable'
import { Http,Headers,RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})


export class ClassroomService {

  endpoint="http://127.0.0.1:3000"
  constructor(public http:Http) {

   }

   search(val){
    console.log(this.endpoint);
     return this.http.get
     (this.endpoint+'/classrooms/search/'+val)
       .map(res=>res.json(),err=>{
         console.log(err);
       })
     ;
    
   }
  getClassrooms(){
    console.log(this.endpoint);
     return this.http.get
     (this.endpoint+'/classrooms')
       .map(res=>res.json(),err=>{
         console.log(err);
       })
     ;
    
   }
   deleteClassRoom(id){
    return this.http.delete
    (this.endpoint+'/classroom/'+ id )
    .map(res=>res.json())
    ;
   }

   getByID(id){
    return this.http.get
    (this.endpoint+'/classroom/'+ id )
    .map(res=>res.json())
    ;
   }

   createClassroom(classroom){
    return this.http.post
    (this.endpoint+'/classroom/',classroom )
    .map(res=>res.json())
    ;
   }
   updateClassroom(id,classroom){
    return this.http.put
    (this.endpoint+'/classroom/'+id,classroom )
    .map(res=>res.json())
    ;
   }
}
