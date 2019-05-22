import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule , Routes} from '@angular/router';
import { HttpModule } from '@angular/http';

import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ClassroomService } from './services/classroom.service';
import { StudentService } from './services/student.service';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { NavebarComponent } from './components/navebar/navebar.component';
import { AddClassroomComponent } from './components/add-classroom/add-classroom.component';
import { EditClassroomComponent } from './components/edit-classroom/edit-classroom.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentComponent } from './components/student/student.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
const appRoutes: Routes=[

{path:'',component:DashboardComponent },
{path:'classrooms',component:ClassroomComponent },
{path:'classrooms/create',component:AddClassroomComponent },
{path:'classrooms/edit/:id',component:EditClassroomComponent },
{path:'students',component:StudentComponent },
{path:'students/create',component:AddStudentComponent },
{path:'students/edit/:id',component:EditStudentComponent }

];  
@NgModule({
  declarations: [
    AppComponent,
    ClassroomComponent,
    NavebarComponent,
    AddClassroomComponent,
    EditClassroomComponent,
    DashboardComponent,
    StudentComponent,
    AddStudentComponent,
    EditStudentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
   
  ],
  providers: [ClassroomService,StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
