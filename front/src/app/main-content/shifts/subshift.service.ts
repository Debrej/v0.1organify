import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandlerService } from '../../http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subshift } from 'src/models/subshift';
import { catchError } from 'rxjs/operators';
import { Orga } from 'src/models/orga';
import { Task } from 'src/models/task';

@Injectable({
  providedIn: 'root'
})
export class SubshiftService {
	private handleError: HandleError;
	baseUrl = 'http://localhost:8000/subshift';

  	constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandlerService) {
		this.handleError = httpErrorHandler.createHandleError('TaskService');
	}

	getAllSubshifts (): Observable<Subshift[]> {
		return this.http.get<Subshift[]>(this.baseUrl + '/all')
		.pipe(
			catchError(this.handleError('getAllSubshifts', []))
		);
	}

	getAllSubshiftOrgas (id: number): Observable<Orga[]> {
		return this.http.get<Orga[]>(this.baseUrl + '/orga/' + id)
			.pipe(
				catchError(this.handleError('getAllSubshiftOrgas', []))
			)
	}

	getAllSubshiftTasks (id: number): Observable<Task[]> {
		return this.http.get<Task[]>(this.baseUrl + '/task/' + id)
		.pipe(
			catchError(this.handleError('getAllSubshiftTasks', []))
		);
	}
	
}
