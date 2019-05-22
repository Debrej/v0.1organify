import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandlerService } from '../../http-error-handler.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubshiftService {
	private handleError: HandleError;
	baseUrl = 'http://localhost:8000/subshift';
	httpOptions = {
		headers: new HttpHeaders({
		  'Content-Type':  'application/json',
		  'Authorization': 'Bearer ' + this.authService.token
		})
	};

  	constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandlerService, private authService: AuthService) {
		this.handleError = httpErrorHandler.createHandleError('TaskService');
	}

	getAllSubshifts (): Observable<any> {
		return this.http.get<any>(this.baseUrl + '/all', this.httpOptions)
		.pipe(
			catchError(this.handleError('getAllSubshifts', {}))
		);
	}

	getAllSubshiftOrgas (id: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + '/orga/' + id, this.httpOptions)
			.pipe(
				catchError(this.handleError('getAllSubshiftOrgas', []))
			)
	}

	getAllSubshiftTasks (id: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + '/task/' + id, this.httpOptions)
		.pipe(
			catchError(this.handleError('getAllSubshiftTasks', []))
		);
	}
	
}
