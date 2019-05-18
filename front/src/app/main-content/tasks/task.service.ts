import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../../../models/task';
import { HttpErrorHandlerService, HandleError } from '../../http-error-handler.service';
import { Subshift } from 'src/models/subshift';
import { Orga } from 'src/models/orga';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
	private handleError: HandleError;
	baseUrl = 'http://localhost:8000/task/';

	constructor(private http: HttpClient,
		httpErrorHandler: HttpErrorHandlerService) {
		this.handleError = httpErrorHandler.createHandleError('TaskService');
	}

	createTask (idStart: number, idEnd: number, idOrga: number, body: any): Observable<Object> {
		return this.http.post(this.baseUrl + idStart + '/' + idEnd + '/' + idOrga, body)
			.pipe(
				catchError(this.handleError('createTask', {}))
			);
	}

	getAllTasks (): Observable<Task[]> {
		return this.http.get<Task[]>(this.baseUrl + 'all')
			.pipe(
				catchError(this.handleError('getAllTasks', []))
			);
	}

	getTask (id: number): Observable<Task> {
		return this.http.get<Task>(this.baseUrl + id)
			.pipe(
				catchError(this.handleError('getTaskById', null))
			);
	}

	getTaskShift (id: number): Observable<Subshift[]> {
		return this.http.get<Subshift[]>(this.baseUrl + 'shift/' + id)
			.pipe(
				catchError(this.handleError('getTaskShift', []))
			);
	}

	getAllTaskOrgas (id: number): Observable<Orga[]> {
		return this.http.get<Orga[]>(this.baseUrl + 'orga/assigned/' + id)
			.pipe(
				catchError(this.handleError('getAllTaskOrgas', []))
			)
	}

	deleteTask(id: number): Observable<Object> {
		return this.http.delete(this.baseUrl + id)
			.pipe(
				catchError(this.handleError('deleteTask', {}))
			);
	}

	deleteTaskSubshift(idTask: number, idSubShift: number): Observable<Object> {
		return this.http.delete(this.baseUrl + idTask + '/' + idSubShift)
			.pipe(
				catchError(this.handleError('deleteTaskSubshift', {}))
			);
	}

}
