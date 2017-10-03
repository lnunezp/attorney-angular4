import { Injectable, Output } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { UserStoreService } from './index';
import { User } from '../_models/index';
import { Options } from './index';
import { environment } from '../../environments/environment';

@Injectable()
/**
 * Servicio genérico para operaciones CRUD con autenticacion por JWT
 * */
export class CrudAuthenticService {
    apiEndPoint = '';

    constructor(
      protected http: Http,
      protected router: Router,
      protected userStoreService: UserStoreService,
      protected options: RequestOptions,
    ) {
      const optionsHeaders = new Options(this.userStoreService);
      this.options = optionsHeaders.getOptionsHeaders();
    }

    /** Lee lista completa de elementos */
    get(): Observable<any> {
        return this.http.get(this.apiEndPoint, this.options);
        // .catch(this.onCatch());
        // .finally(this.onFinally());
    }

    /** Lee un elemento por su clave principal */
    getById(id: string, param: string): Observable<any> {
        return this.http.get(`${this.apiEndPoint}?$filter=${param} eq ${id}`, this.options)
        .catch(this.onCatch())
        .finally(this.onFinally());
    }

    /** Actualizar o crear un nuevo elemento */
    save(item: any): Observable<any> {
        if (item.id) {
            return this.put(item);
        } else {
            return this.post(item);
        }
    }
    /** Crear */
    post(item: any): Observable<any> {
        return this.http.post(this.apiEndPoint, item, this.options)
        .catch(this.onCatch())
        .finally(this.onFinally());
    }
    /** Actualizar */
    put(item: any): Observable<any> {
        return this.http.put(this.apiEndPoint, item, this.options)
        .catch(this.onCatch())
        .finally(this.onFinally());
    }

    /** Eliminar */
    delete(id: any): Observable<any> {
        return this.http.delete(`${this.apiEndPoint}?id=${id}`, this.options)
        .catch(this.onCatch())
        .finally(this.onFinally());
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

    private onFinally() {
      return () => console.log('end');
    }
}
