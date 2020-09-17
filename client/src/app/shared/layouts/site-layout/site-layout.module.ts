import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SiteLayoutPageRoutingModule } from './site-layout-routing.module';

import { SiteLayoutPage } from './site-layout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SiteLayoutPageRoutingModule
  ],
  declarations: [SiteLayoutPage]
})
export class SiteLayoutPageModule {}
