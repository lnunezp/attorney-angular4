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
export class UpdateClientServices extends CrudAuthenticService {
  constructor(
    http: Http,
    router: Router,
    userStoreService: UserStoreService,
    options: RequestOptions,
  ) {
      super(http, router, userStoreService, options);
      this.apiEndPoint = `${environment.apiUrl}Client/Update`;
  }

  private extractData(res: Response) {
        const response = res.json();
        return response;
      }

  updateClient(token: string, name: string, lastname: string,
    email: string, mobile: number, phone: number, rut: number, dv: string) {
    return this.put({ name, lastname, email, mobile, phone, rut, dv, token })
    .map((res: any) => res.json())
    .catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error.json().error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
