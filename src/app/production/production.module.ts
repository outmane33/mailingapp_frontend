import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionComponent } from './components/production/production.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { RecipientesComponent } from './components/recipientes/recipientes.component';
import { PlaceholdersComponent } from './components/placeholders/placeholders.component';
import { ListFiltersComponent } from './components/list-filters/list-filters.component';
import { EmailListsComponent } from './components/email-lists/email-lists.component';
import { AllBoitesComponent } from './components/all-boites/all-boites.component';
import { AfterTestComponent } from './components/after-test/after-test.component';
import { BeforeTestComponent } from './components/before-test/before-test.component';
import { OfferInfoComponent } from './components/offer-info/offer-info.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { IspComponent } from './components/isp/isp.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductionComponent,
    HeaderComponent,
    BodyComponent,
    RecipientesComponent,
    PlaceholdersComponent,
    ListFiltersComponent,
    EmailListsComponent,
    AllBoitesComponent,
    AfterTestComponent,
    BeforeTestComponent,
    OfferInfoComponent,
    IspComponent,
  ],
  imports: [CommonModule, BrowserModule, FormsModule],
})
export class ProductionModule {}
