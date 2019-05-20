import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandlerService } from '../../http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Shift } from 'src/models/shift';
import { Orga } from 'src/models/orga';
import { Subshift } from 'src/models/subshift';
import { Task } from 'src/models/task';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
	private handleError: HandleError;
	baseUrl = 'http://localhost:8000/shift';

  	constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandlerService) {
		this.handleError = httpErrorHandler.createHandleError('TaskService');
	}

	createShift(startDate: string): Observable<Object> {
		return this.http.post(this.baseUrl + '/' + startDate, null)
			.pipe(
				catchError(this.handleError('createShift', {}))
			);
	}

	createMultipleShifts(startDate: string, endDate: string): Observable<Object> {
		return this.http.post(this.baseUrl + '/' + startDate + '/' + endDate, null)
			.pipe(
				catchError(this.handleError('createMultipleShifts', {}))
			);
	}

	getAllShifts (): Observable<Shift[]> {
		return this.http.get<Shift[]>(this.baseUrl + '/all')
		.pipe(
			catchError(this.handleError('getAllShifts', []))
		);
	}

	getAllShiftOrgas (id: number): Observable<Orga[]> {
		return this.http.get<Orga[]>(this.baseUrl + '/orga/' + id)
			.pipe(
				catchError(this.handleError('getAllShiftOrgas', []))
			)
	}

	getShiftSubshifts (id: number): Observable<Subshift[]> {
		return this.http.get<Subshift[]>(this.baseUrl + '/subshift/' + id)
			.pipe(
				catchError(this.handleError('getshiftSubshifts', []))
			);
	}

	getAllShiftTasks (id: number): Observable<Task[]> {
		return this.http.get<Task[]>(this.baseUrl + '/task/' + id)
		.pipe(
			catchError(this.handleError('getAllShiftTasks', []))
		);
	}

	deleteShift(idShift: number, deleteTasks: boolean): Observable<Object> {
		let tasksDelete = deleteTasks ? 1 : 0;
		return this.http.delete(this.baseUrl + '/' + idShift + '/' + tasksDelete)
			.pipe(
				catchError(this.handleError('deleteShift', {}))
			);
	}

}
