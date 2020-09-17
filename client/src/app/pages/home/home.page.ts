import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";

import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  allUsers;
  allFilteredUsers;
  isVisibleFilter = false;
  handleInputValue;

  currentUserEmail;
  
  constructor( private authService: AuthService,
               private router: Router ) { }

  ngOnInit() {
    this.currentUserEmail = jwt_decode(localStorage.getItem('auth-token')).email;
  }
  
  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getAllUsers(){
    this.authService.getAllUsers().subscribe((data) => {
      this.allUsers = data;
      this.allFilteredUsers = data;
      this.isVisibleFilter = true;
    })
  }

  handleInput(event){
     if(event){
       this.allFilteredUsers = this.allUsers.filter(item => {
         return item.email.toLowerCase().indexOf(event.toLowerCase()) !== -1
       })
     }else{
       this.allFilteredUsers = this.allUsers;
     }
  }
  
}
