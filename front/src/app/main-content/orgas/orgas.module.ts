import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgasRoutingModule } from './orgas-routing.module';
import { OrgasComponent } from './orgas.component';
import { OrgasListComponent } from './orgas-list/orgas-list.component';
import { OrgaDetailComponent } from './orga-detail/orga-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
	  OrgasComponent,
	  OrgasListComponent,
	  OrgaDetailComponent
	],
  imports: [
	CommonModule,
	FormsModule,
    OrgasRoutingModule
  ],
  exports: [
	  OrgasComponent
  ]
})
export class OrgasModule { }
