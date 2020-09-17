import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  aSub: Subscription;

  constructor( private authService: AuthService,
               private router: Router,
               private fb: FormBuilder ) { }

  ngOnInit() {
    this.formControlsRegisterForm();
  }

  formControlsRegisterForm(){
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]]
    })
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.registerForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  register(){
    this.registerForm.disable()
    this.aSub = this.authService.register(this.registerForm.value).subscribe(
        (user) => {
          // console.log(user)
          this.router.navigate(['system/login'], {
            queryParams: {
              registered: true
            }
          })
        },
        error => {
          console.warn(error.error.message)
          alert("ErrorCode - " + error.status + ', ErrorMessage - ' + error.error.message);
          this.registerForm.enable()
        }
    )
  }

}
