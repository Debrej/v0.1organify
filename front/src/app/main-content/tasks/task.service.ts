import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError } from '../../http-error-handler.service';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
	private handleError: HandleError;
	baseUrl = 'https://api.organify.debrej.fr/task/';
	httpOptions = {
		headers: new HttpHeaders({
		  'Content-Type':  'application/x-www-form-urlencoded',
		  'Authorization': 'Bearer ' + this.authService.token
		})
	};

	constructor(private http: HttpClient,
		httpErrorHandler: HttpErrorHandlerService, private authService: AuthService) {
		this.handleError = httpErrorHandler.createHandleError('TaskService');
	}

	createTask (idStart: number, idEnd: number, idOrga: number, body: any): Observable<any> {
		return this.http.post(this.baseUrl + idStart + '/' + idEnd + '/' + idOrga, body, this.httpOptions)
			.pipe(
				catchError(this.handleError('createTask', {}))
			);
	}

	getAllTasks (): Observable<any> {
		return this.http.get<any>(this.baseUrl + 'all', this.httpOptions)
			.pipe(
				catchError(this.handleError('getAllTasks', {}))
			);
	}

	getTask (id: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + id, this.httpOptions)
			.pipe(
				catchError(this.handleError('getTaskById', {}))
			);
	}

	getTaskShift (id: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + 'shift/' + id, this.httpOptions)
			.pipe(
				catchError(this.handleError('getTaskShift', {}))
			);
	}

	getAllTaskOrgas (id: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + 'orga/assigned/' + id, this.httpOptions)
			.pipe(
				catchError(this.handleError('getAllTaskOrgas', {}))
			)
	}

	deleteTask(id: number): Observable<any> {
		return this.http.delete(this.baseUrl + id, this.httpOptions)
			.pipe(
				catchError(this.handleError('deleteTask', {}))
			);
	}

	deleteTaskSubshift(idTask: number, idSubShift: number): Observable<any> {
		return this.http.delete(this.baseUrl + idTask + '/' + idSubShift, this.httpOptions)
			.pipe(
				catchError(this.handleError('deleteTaskSubshift', {}))
			);
	}

	deleteTaskOrga(idTask: number, idOrga: number): Observable<any> {
		return this.http.delete(this.baseUrl + 'orga/' + idTask + '/' + idOrga, this.httpOptions)
			.pipe(
				catchError(this.handleError('deleteTaskSubshift', {}))
			);
	}

}