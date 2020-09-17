import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";
import * as jwt_decode from "jwt-decode";

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  updateForm: FormGroup;
  removeForm: FormGroup;
  passwordDoesntMatchNotification = false;
  userId;
  currentUser;
  buttonText = 'Back'

  constructor( private authService: AuthService,
               private fb: FormBuilder,
               private router: Router,
               public toastController: ToastController ) { }

  ngOnInit() {
    this.userId = jwt_decode(localStorage.getItem('auth-token')).userId;

    this.authService.getUserById(this.userId).subscribe(data => {
      this.currentUser = data;
      this.updateForm = this.fb.group({
        email: [this.currentUser.email, [Validators.required, Validators.email]],
        password: [null]
      })

    })

    this.formControlsUpdateForm();
    this.formControlsRemoveForm();
  }

  formControlsUpdateForm(){
    this.updateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null]
    })
  }

  update(){
    this.authService.updateUser(this.updateForm.value, this.userId).subscribe(data => {
      this.presentToast()
      this.router.navigate(['/home'])
    })
  }
  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your changes have been saved.',
      duration: 2000
    });
    toast.present();
  }
  
  // -- remove user start --
  formControlsRemoveForm(){
    this.removeForm = this.fb.group({
      checkPassword: [null]
    })
  }
  remove(){
    this.authService.checkIfPasswordMatches(this.removeForm.value, this.userId).subscribe(data => {
      if(data){
        // console.log('user removed...')
        this.authService.removeAccount(this.userId).subscribe(d => {
          this.authService.logout();
          this.router.navigate(['/login'])
        })
      }else{
        // console.log('user dont removed...')
        this.passwordDoesntMatchNotification = true;
      }
    })
  }
  // -- remove user end --

  
}
