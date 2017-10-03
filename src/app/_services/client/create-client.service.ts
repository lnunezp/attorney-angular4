import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';
import { Options } from '../../_helpers/index';
import { UserStoreService, CrudAuthenticService } from '../../_helpers/index';
import { Router } from '@angular/router';

@Injectable()
export class CreateClientServices extends CrudAuthenticService {
  constructor(
    http: Http,
    router: Router,
    userStoreService: UserStoreService,
    options: RequestOptions,
  ) {
    super(http, router, userStoreService, options);
    this.apiEndPoint = `${environment.apiUrl}Client/Create`;
  }

  private extractData(res: Response) {
        const response = res.json();
        return response;
      }

  createClient(name: string, lastname: string, email: string, mobile: number, phone: number, rut: number, dv: string) {
    return this.post({ name, lastname, email, mobile, phone, rut, dv })
    .map((res: any) => res.json())
    .catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error.json().error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
