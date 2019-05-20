import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftsRoutingModule } from './shifts-routing.module';
import { ShiftsComponent } from './shifts.component';
import { ShiftsListComponent } from './shifts-list/shifts-list.component';
import { ShiftDetailComponent } from './shift-detail/shift-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
	  ShiftsComponent,
	  ShiftsListComponent,
	  ShiftDetailComponent
	],
  imports: [
	CommonModule,
	FormsModule,
    ShiftsRoutingModule
  ],
  exports: [
	  ShiftsComponent
  ]
})
export class ShiftsModule { }
