import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandlerService } from '../../http-error-handler.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root'
})

export class ShiftService {
	private handleError: HandleError;
	baseUrl = 'http://localhost:8000/shift';
	httpOptions = {
		headers: new HttpHeaders({
		  'Content-Type':  'application/json',
		  'Authorization': 'Bearer ' + this.authService.token
		})
	};
	
  	constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandlerService, private authService: AuthService) {
		this.handleError = httpErrorHandler.createHandleError('TaskService');
	}

	createShift(startDate: string): Observable<Object> {
		return this.http.post(this.baseUrl + '/' + startDate, null, this.httpOptions)
			.pipe(
				catchError(this.handleError('createShift', {}))
			);
	}

	createMultipleShifts(startDate: string, endDate: string): Observable<any> {
		return this.http.post(this.baseUrl + '/' + startDate + '/' + endDate, null, this.httpOptions)
			.pipe(
				catchError(this.handleError('createMultipleShifts', {}))
			);
	}

	getAllShifts (): Observable<any> {
		return this.http.get<any>(this.baseUrl + '/all', this.httpOptions)
		.pipe(
			catchError(this.handleError('getAllShifts', []))
		);
	}

	getAllShiftOrgas (id: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + '/orga/' + id, this.httpOptions)
			.pipe(
				catchError(this.handleError('getAllShiftOrgas', {}))
			)
	}

	getShiftSubshifts (id: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + '/subshift/' + id, this.httpOptions)
			.pipe(
				catchError(this.handleError('getshiftSubshifts', {}))
			);
	}

	getAllShiftTasks (id: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + '/task/' + id, this.httpOptions)
		.pipe(
			catchError(this.handleError('getAllShiftTasks', {}))
		);
	}

	deleteShift(idShift: number, deleteTasks: boolean): Observable<any> {
		let tasksDelete = deleteTasks ? 1 : 0;
		return this.http.delete(this.baseUrl + '/' + idShift + '/' + tasksDelete, this.httpOptions)
			.pipe(
				catchError(this.handleError('deleteShift', {}))
			);
	}

}
