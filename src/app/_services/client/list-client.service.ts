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
export class ListClientServices extends CrudAuthenticService {
  constructor(
    http: Http,
    router: Router,
    userStoreService: UserStoreService,
    options: RequestOptions,
  ) {
      super(http, router, userStoreService, options);
      this.apiEndPoint = `${environment.apiUrl}Client/List`;
  }

  loadData() {
    return this.get()
    .map((response) => {
      return response.json();
    })
    .toPromise();
  }

  loadDataById(id: string, param: string) {
    return this.getById(id, param)
    .map((response) => {
      return response.json();
    })
    .toPromise();
  }
}
