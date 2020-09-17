import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteLayoutPage } from './site-layout.page';

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutPage,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../../../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'profile',
            loadChildren: () => import('../../../pages/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'posts',
            loadChildren: () => import('../../../pages/posts/posts.module').then(m => m.PostsPageModule)
      },
      {
        path: 'gallery',
            loadChildren: () => import('../../../pages/photo-gallery/photo-gallery.module').then(m => m.PhotoGalleryPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteLayoutPageRoutingModule {}
