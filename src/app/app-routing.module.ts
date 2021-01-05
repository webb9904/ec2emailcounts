import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountsComponent } from './counts/counts.component';
import { ExclusionsSummaryComponent } from './exclusions-summary/exclusions-summary.component';
import { RecipientsSummaryComponent } from './recipients-summary/recipients-summary.component';

const routes: Routes = [
  { path: 'counts', component: CountsComponent },
  { path: 'exclusions-summary', component: ExclusionsSummaryComponent },
  { path: 'recipients-summary', component: RecipientsSummaryComponent },
  { path: '**',   redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
