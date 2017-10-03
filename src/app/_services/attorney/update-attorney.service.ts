import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';
import { Options } from '../../_helpers/index';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStoreService, CrudAuthenticService } from '../../_helpers/index';

@Injectable()
export class UpdateAttorneyService extends CrudAuthenticService {
  constructor(
    http: Http,
    router: Router,
    userStoreService: UserStoreService,
    options: RequestOptions,
  ) {
    super(http, router, userStoreService, options);
    this.apiEndPoint = `${environment.apiUrl}Attorney/Update`;
  }

  private extractData(res: Response) {
        const response = res.json();
        return response;
      }

  updateAttorney(token: string, rut: number, dv: string, nombre: string, apellidos: string) {
    return this.put({ rut, dv, nombre, apellidos, token })
    .map((res: any) => res.json())
    .catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error.json().error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
