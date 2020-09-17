import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";
import { ToastController } from '@ionic/angular';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  aSub: Subscription;

  constructor( private authService: AuthService,
               private router: Router,
               private fb: FormBuilder,
               public toastController: ToastController ) { }

  ngOnInit() {
    this.formControlsLoginForm();
  }

  formControlsLoginForm(){
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  login(){
    this.loginForm.disable()
    this.aSub = this.authService.login(this.loginForm.value).subscribe(
        () => this.router.navigate(['/home']),
        error => {
          console.warn(error.error.message)
          // alert("ErrorCode - " + error.status + ', ErrorMessage - ' + error.error.message);
          this.presentToast(error.status, error.error.message)
          this.loginForm.enable()
        }
    )
  }

  async presentToast(errorCode, errorMessage) {
    const toast = await this.toastController.create({
      // message: 'Your changes have been saved.',
      message: errorMessage,
      duration: 2000
    });
    toast.present();
  }
  
}
