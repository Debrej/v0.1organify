import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import listPlugin from '@fullcalendar/list';
import { EventInput } from '@fullcalendar/core';
import { Shift } from 'src/models/shift';
import { Task } from 'src/models/task';
import { Subshift } from 'src/models/subshift';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

	@ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template

	calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin, bootstrapPlugin, listPlugin];
	calendarVisible = true;
	calendarWeekends = true;
  	calendarEvents: EventInput[] = [];

	handleDateClick(arg) {
		if (confirm('Ajouter un évènement au ' + arg.dateStr + ' ?')) {
			this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
				title: 'New Event',
				start: arg.date,
				allDay: arg.allDay
			  })
		}
	}

	handleEventClick(info) {
		const ev = info.event;
		alert("Informations :\n\n" + "Titre : " + ev.title + "\nDébut : " + ev.start + "\nFin : " + ev.end);
	}


  constructor() { }

  ngOnInit() {
		//getShifts
		let shifts = [new Shift(undefined, 1, "2019-05-23 15:00:00", "2019-05-23 16:00:00"), new Shift(1, 2, "2019-05-23 16:00:00", "2019-05-23 17:00:00")];
		for(let shift of shifts) {
			let e = {
				id: shift.idShift,
				start: shift.start_date,
				end: shift.end_date,
				title: `Créneau ${shift.idShift}`
			}
			this.calendarEvents.push(e);
		}
		//getTasks
		let tasks = [
			{idTask: 1, name: "Test", description: "TEst ibeifbzrng", idOrga: 2},
			{idTask: 2, name: "Test2", description: "TEst2 ibeifbzrng", idOrga: 3}
		];
		for(let task of tasks) {
			//getSubshifts corresponding to Tasks
			let subshifts = [
				new Subshift(2, "2019-05-23 15:15:00", "2019-05-23 15:30:00")
			]
			for(let sub of subshifts) {
				let ev = {
					id: sub.idSubshift,
					start: sub.start_date,
					end: sub.end_date,
					title: task.name,
					backgroundColor: '#ff0000'
				}
				this.calendarEvents.push(ev);
			}
		}
	}

}
