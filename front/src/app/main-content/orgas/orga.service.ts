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
export class OrgaService {
	private handleError: HandleError;
	baseUrl = 'http://localhost:8000/orga';

  	constructor(private http: HttpClient,
		httpErrorHandler: HttpErrorHandlerService) {
		this.handleError = httpErrorHandler.createHandleError('OrgaService');
	}

	createOrga(body: any): Observable<Object> {
		return this.http.post(this.baseUrl, body)
		.pipe(
			catchError(this.handleError('createOrga', {}))
		);
	}

	postShifts(id: number, body: any): Observable<Object> {
		return this.http.post(this.baseUrl + '/shift/' + id, body)
		.pipe(
			catchError(this.handleError('postShifts', {}))
		);
	}

	assignTaskToOrga(idOrga: number, idTask: number) {
		return this.http.post(this.baseUrl + '/task/' + idOrga + '/' +idTask, null)
		.pipe(
			catchError(this.handleError('assignTaskToOrga', {}))
		);
	}

	getAllOrgas (): Observable<Orga[]> {
		return this.http.get<Orga[]>(this.baseUrl + '/all')
		.pipe(
			catchError(this.handleError('getAllOrgas', []))
		);
	}

	getOrga (id: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + '/' + id)
		.pipe(
			catchError(this.handleError('getOrgaById', {}))
		);
	}

	getOrgaShift (id: number): Observable<any> {
		return this.http.get<any>(this.baseUrl + '/shift/' + id)
		.pipe(
			catchError(this.handleError('getOrgaShift', {}))
		);
	}

	getAllOrgaTasks (id: number): Observable<Task[]> {
		return this.http.get<Task[]>(this.baseUrl + '/task/assigned/' + id)
		.pipe(
			catchError(this.handleError('getAllOrgaTasks', []))
		);
	}

	getAllAvailableTasks (id: number): Observable<Object> {
		return this.http.get<Object>(this.baseUrl + '/task/available/' + id)
		.pipe(
			catchError(this.handleError('getAllAvailableTasks', {}))
		);
	}

	getResponsibleOrgaTasks (id: number): Observable<Task[]> {
		return this.http.get<Task[]>(this.baseUrl + '/task/resp/' + id)
		.pipe(
			catchError(this.handleError('getResponsibleOrgaTasks', []))
		);
	}

	deleteOrga(idOrga: number, deleteTasks: boolean): Observable<Object> {
		let tasksDelete = deleteTasks ? 1 : 0;
		return this.http.delete(this.baseUrl + '/' + idOrga + '/' + tasksDelete)
			.pipe(
				catchError(this.handleError('deleteOrga', {}))
			);
	}

}
