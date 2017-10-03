import { Injectable, Output } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
/**
 * Servicio genérico para operaciones CRUD simples
 * */
export class CrudService {
    apiEndPoint = '';

    constructor(
      protected http: Http,
      protected router: Router,
    ) { }

    /** Reads the full list of items */
    get(): Observable<any> {
        return this.http
            .get(this.apiEndPoint);
    }

    /** Reads an item by its primary key */
    getById(id: string): Observable<any> {
        return this.http
            .get(`${this.apiEndPoint}/${id}`);
    }

    /** Update or create a new item */
    save(item: any): Observable<any> {
        if (item.id) {
            return this.put(item.id, item);
        } else {
            return this.post(item);
        }
    }
    /** Create */
    post(item: any): Observable<any> {
        return this.http
            .post(this.apiEndPoint, item);
            // .catch(this.onCatch());
    }
    /** Update */
    put(id: string, item: any): Observable<any> {
        return this.http
            .put(`${this.apiEndPoint}/${id}`, item);
    }

    /** Delete */
    delete(id: string): Observable<any> {
        return this.http
            .delete(`${this.apiEndPoint}/${id}`);
    }

    private onCatch() {
      return (res: Response) => {
        if (this.esErrorDeSeguridad(res)) {
          this.router.navigate(['/login']);
        }
        return Observable.throw(res);
      };
    }

    private esErrorDeSeguridad(res) {
      return res.status === 401 || res.status === 403 || res.status === 419;
    }
}
