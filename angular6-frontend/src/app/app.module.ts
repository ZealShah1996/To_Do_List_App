import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {routing} from "./app.routing";
import {AuthenticationService} from "./service/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AddUserComponent } from './add-user/add-user.component';
import { EditModelComponent } from './edit-user/edit-model.component';
import {ListUserComponent} from "./list-user/list-user.component";
import {UserService} from "./service/user.service";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListUserComponent,
    AddUserComponent,
    EditModelComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthenticationService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
