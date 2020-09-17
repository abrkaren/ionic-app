import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.page.html',
  styleUrls: ['./photo-gallery.page.scss'],
})
export class PhotoGalleryPage implements OnInit {

  allGallery;
  loadedGallery = [];
  loadedGalleryCount = 10;
  buttonText = 'Back';
  
  constructor( private authService: AuthService,
               private router: Router,
               public loadingController: LoadingController ) { }

  ngOnInit() {
    this.presentLoading();
    this.getAllGallery();
  }

  getAllGallery(){
    this.authService.getAllGallery().subscribe((data) => {
      this.allGallery = data;
      this.loadedGallery = this.allGallery.slice(0, this.loadedGalleryCount);
    })
  }

  // when scrool load gallery start
  loadGallery(event) {
    setTimeout(() => {
      this.loadedGalleryCount = this.loadedGalleryCount + 10;
      // console.log('Done');
      this.addMorePosts();
      event.target.complete();
    }, 500);
  }
  addMorePosts(){
    this.loadedGallery = this.allGallery.slice(0, this.loadedGalleryCount);
  }
  // when scrool load gallery end


  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

  zoomIn(item){
    // todo
    // console.log(item.thumbnailUrl)
  }

  
}
