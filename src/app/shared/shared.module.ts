import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { LogoComponent } from './components/logo/logo.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AlertComponent } from './components/alert/alert.component';
import { ProductionModule } from '../production/production.module';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    SidebarComponent,
    NavbarComponent,
    AlertComponent,
  ],
  imports: [CommonModule, AppRoutingModule],
  exports: [
    HeaderComponent,
    LogoComponent,
    SidebarComponent,
    NavbarComponent,
    AlertComponent,
  ],
})
export class SharedModule {}
