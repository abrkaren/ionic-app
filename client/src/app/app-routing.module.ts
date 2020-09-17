import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./shared/classes/auth.guard";

const routes: Routes = [
  
  {
    path: '',
    loadChildren: () => import('./shared/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutPageModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./shared/layouts/site-layout/site-layout.module').then(m => m.SiteLayoutPageModule)
  },
  { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full'
  },
  // {
  //   path: 'photo-gallery',
  //   loadChildren: () => import('./pages/photo-gallery/photo-gallery.module').then( m => m.PhotoGalleryPageModule)
  // },
  // {
  //   path: 'posts',
  //   loadChildren: () => import('./pages/posts/posts.module').then( m => m.PostsPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
