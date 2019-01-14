import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { AuthenticationService } from "../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService) { }

  onSubmit() {

    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    if (this.loginForm.controls.email.value != '' && this.loginForm.controls.password.value != '') {
     debugger;
      this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe((response) => {
debugger;
        console.log(response);
        if(response.status==401){
          this.invalidLogin = true;
        }
        else{
        this.router.navigate([`list-todolists/${response.data[0].id}`]);
      }
      });
    } else {
      this.invalidLogin = true;
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



}
