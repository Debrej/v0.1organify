import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import listPlugin from '@fullcalendar/list';
import { EventInput } from '@fullcalendar/core';

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
  	calendarEvents: EventInput[] = [
    	{ title: 'Event Now', start: new Date() }
	];

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
  }

}
