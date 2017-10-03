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
export class CreatePaymentService extends CrudAuthenticService {
  constructor(
    http: Http,
    router: Router,
    userStoreService: UserStoreService,
    options: RequestOptions,
  ) {
    super(http, router, userStoreService, options);
    this.apiEndPoint = `${environment.apiUrl}Payment/Create`;
  }

  private extractData(res: Response) {
        const response = res.json();
        return response;
      }

  createPayment(tokencase: string, voucher: string, value: number) {
    return this.post({ tokencase, voucher, value })
    .map((res: any) => res.json())
    .catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error.json().error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
