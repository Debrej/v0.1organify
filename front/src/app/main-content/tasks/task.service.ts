import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../../../models/task';
import { HttpErrorHandlerService, HandleError } from '../../http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
	private handleError: HandleError;
	baseUrl = 'http://localhost/task/';

	constructor(private http: HttpClient,
		httpErrorHandler: HttpErrorHandlerService) {
		this.handleError = httpErrorHandler.createHandleError('TaskService');
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
}
