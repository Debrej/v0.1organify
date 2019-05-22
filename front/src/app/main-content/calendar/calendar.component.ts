import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import listPlugin from '@fullcalendar/list';
import { EventInput } from '@fullcalendar/core';
import { Shift } from 'src/models/shift';
import { Subshift } from 'src/models/subshift';
import { ShiftService } from '../shifts/shift.service';
import { Task } from 'src/models/task';
import { TaskService } from '../tasks/task.service';

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
		confirm("Informations :\n\n" + "Titre : " + ev.title + "\nDébut : " + ev.start + "\nFin : " + ev.end);
	}

	shifts: {
		idShift: number,
		start_date: string,
		end_date: string
	} [] | Shift[];
	tasks: Task[];
	subshifts: Subshift[];

  constructor(private shiftService: ShiftService, private taskService: TaskService) { }

  ngOnInit() {
		this.getShifts();
		this.getTasks();
	}

	getShifts() {
		this.shiftService.getAllShifts()
		.subscribe(res => {
			if(res.status == 0) {
				this.shifts = res.shift;
				for(let shift of this.shifts) {
					let e = {
						id: shift.idShift,
						start: shift.start_date,
						end: shift.end_date,
						url: `/shifts/${shift.idShift}`,
						title: `Créneau ${shift.idShift}`
					}
					this.calendarEvents.push(e);
				}
			}
		});
	}

	getTasks() {
		this.taskService.getAllTasks()
		.subscribe(res => {
			if (res.status == 0) {
				this.tasks = res.task;
				for(let task of this.tasks) {
					this.getSubshiftsOfTask(task.idTask);
					for(let sub of this.subshifts) {
						let ev = {
							id: sub.idSubshift,
							start: sub.start_date,
							end: sub.end_date,
							title: task.name,
							url: `/tasks/${task.idTask}`,
							backgroundColor: '#ff0000'
						}
						this.calendarEvents.push(ev);
					}
				}
			}
		});

	}

	getSubshiftsOfTask(id: number) {
		this.taskService.getTaskShift(id)
		.subscribe(res => {
			if (res.status == 0) {
				this.subshifts = res.subshift;
			}
		});
	}
}
