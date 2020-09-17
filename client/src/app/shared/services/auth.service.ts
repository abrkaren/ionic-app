import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from '../interfaces'
import { Post } from '../interfaces'
import { Gallery } from '../interfaces'
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private token = null;

  constructor( private http: HttpClient ) { }

  // -- CRUD --

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>('/api/auth/login', user)
      .pipe(
        tap(
          ({token}) => {
            // console.log('++' + token)
            localStorage.setItem('auth-token', token);
            this.setToken(token)
          }
        )
      )
  }
  
  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user)
  }

  getAllUsers(){
    return this.http.get<User>('/api/auth/getUsers')
  }

  getUserById(id){
    return this.http.get('/api/auth/getUserById/' + id);
  }

  updateUser(updateForm, id){
    let obj = {
      updateForm: updateForm,
      id: id
    };
    return this.http.put<User>(`/api/auth/updateUser/${id}`, obj);
  }

  checkIfPasswordMatches(checkPassword, userId){
    let obj = {
      checkPassword: checkPassword,
      userId: userId
    }
    return this.http.post<User>(`/api/auth/checkIfPasswordMatches`, obj);
  }

  removeAccount(userId){
    return this.http.delete<any>(`/api/auth/removeAccount/${userId}`);
  }

  // -- CRUD --

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
    return true
  }

  logout() {
    this.setToken(null);
    localStorage.clear()
  }

  getAllPosts(){
    return this.http.get<Post>('https://jsonplaceholder.typicode.com/posts')
  }

  getAllGallery(){
    return this.http.get<Gallery>('https://jsonplaceholder.typicode.com/photos')
  }


}
