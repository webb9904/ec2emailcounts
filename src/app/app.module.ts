import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CountsComponent } from './counts/counts.component';
import { RecipientsSummaryComponent } from './recipients-summary/recipients-summary.component';
import { RecipientsComponent } from './recipients/recipients.component';
import { DialogComponent } from './dialog/dialog.component';
import { ExclusionsSummaryComponent } from './exclusions-summary/exclusions-summary.component';
import { ExclusionsComponent } from './exclusions/exclusions.component';

@NgModule({
  declarations: [
    AppComponent,
    CountsComponent,
    RecipientsSummaryComponent,
    RecipientsComponent,
    DialogComponent,
    ExclusionsSummaryComponent,
    ExclusionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
