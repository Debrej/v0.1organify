import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError } from '../../http-error-handler.service';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrgaService {
	private handleError: HandleError;
	baseUrl = 'https://api.organify.debrej.fr/orga';
	httpOptions = {
		headers: new HttpHeaders({
		  'Content-Type':  'application/x-www-form-urlencoded',
		  'Authorization': 'Bearer ' + this.authService.token
		})
	};

  	constructor(private http: HttpClient,
		httpErrorHandler: HttpErrorHandlerService, private authService: AuthService) {
		this.handleError = httpErrorHandler.createHandleError('OrgaService');
	}

	createOrga(body: any): Observable<any> {
		return this.http.post(this.baseUrl, body, this.httpOptions)
		.pipe(
			catchError(this.handleError('createOrga', {}))
		);
	}

	postShifts(id: number, body: any): Observable<any> {
		return this.http.post(this.baseUrl + '/shift/' + id, body, this.httpOptions)
		.pipe(
			catchError(this.handleError('postShifts', {}))
		);
	}

	assignTaskToOrga(idOrga: number, idTask: number): Observable<any> {
		return this.http.post(this.baseUrl + '/task/' + idOrga + '/' +idTask, null, this.httpOptions)
		.pipe(
			catchError(this.handleError('assignTaskToOrga', {}))
		);
	}

	getAllOrgas (): Observable<any> {
		return this.http.get<any>(this.baseUrl + '/all', this.httpOptions)
		.pipe(
			catchError(this.handleError('getAllOrgas', {}))
		);
	}

	getOrga (id: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + '/' + id, this.httpOptions)
		.pipe(
			catchError(this.handleError('getOrgaById', {}))
		);
	}

	getOrgaShift (id: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + '/shift/' + id, this.httpOptions)
		.pipe(
			catchError(this.handleError('getOrgaShift', {}))
		);
	}

	getAllOrgaTasks (id: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + '/task/assigned/' + id, this.httpOptions)
		.pipe(
			catchError(this.handleError('getAllOrgaTasks', {}))
		);
	}

	getAllAvailableTasks (id: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + '/task/available/' + id, this.httpOptions)
		.pipe(
			catchError(this.handleError('getAllAvailableTasks', {}))
		);
	}

	getResponsibleOrgaTasks (id: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + '/task/resp/' + id, this.httpOptions)
		.pipe(
			catchError(this.handleError('getResponsibleOrgaTasks', {}))
		);
	}

	deleteOrga(idOrga: number, deleteTasks: boolean): Observable<any> {
		let tasksDelete = deleteTasks ? 1 : 0;
		return this.http.delete(this.baseUrl + '/' + idOrga + '/' + tasksDelete, this.httpOptions)
			.pipe(
				catchError(this.handleError('deleteOrga', {}))
			);
	}

}
