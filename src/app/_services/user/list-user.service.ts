import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { Options } from '../../_helpers/index';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStoreService, CrudAuthenticService } from '../../_helpers/index';

@Injectable()
export class ListUserServices extends CrudAuthenticService {
  constructor(
    http: Http,
    router: Router,
    userStoreService: UserStoreService,
    options: RequestOptions,
  ) {
      super(http, router, userStoreService, options);
      this.apiEndPoint = `${environment.apiUrl}User/List`;
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
