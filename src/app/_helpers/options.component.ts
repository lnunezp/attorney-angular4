import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { UserStoreService } from './index';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class Options {
  private payload: any;
  private router: Router;
  private route: ActivatedRoute;
  constructor(private userStoreService: UserStoreService) { }

  getOptionsHeaders() {
    this.payload = this.userStoreService.getProfile();

    if ( this.payload.token !== null ) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${this.payload.token.access_token}`);
      const options = new RequestOptions({ headers });
      return options;
     } else {
       this.router.navigate(['/login']);
     }
  }

  getOptions() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return options;
  }
}
