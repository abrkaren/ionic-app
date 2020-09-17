import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  allPosts;
  loadedPosts = [];
  loadedPostsCount = 10;
  buttonText = 'Back';

  constructor( private authService: AuthService,
               private router: Router,
               public loadingController: LoadingController ) { }

  ngOnInit() {
    this.presentLoading();
    this.getAllPosts();
  }

  getAllPosts(){
    this.authService.getAllPosts().subscribe((data) => {
      this.allPosts = data;
      this.loadedPosts = this.allPosts.slice(0, this.loadedPostsCount);
    })
  }

  // when scrool load posts start
  loadData(event) {
    setTimeout(() => {
      this.loadedPostsCount = this.loadedPostsCount + 10;
      // console.log('Done');
      this.addMorePosts();
      event.target.complete();
    }, 500);
  }
  addMorePosts(){
    this.loadedPosts = this.allPosts.slice(0, this.loadedPostsCount);
  }
  // when scrool load posts end

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

}
