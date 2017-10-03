import { CrudService } from '../../_helpers/crud.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataStorage } from '../../_models/index';
import { UserStoreService } from '../../_helpers/index';
import { environment } from '../../../environments/environment';

@Injectable()
/**
 * CRUD con lógica específica apara usuarios y sesiones
 * */
export class AuthenticationService extends CrudService {
  private returnUrl: string;

  constructor(
    private userStoreService: UserStoreService,
    http: Http,
    router: Router,
    private route: ActivatedRoute,
  ) {
    super(http, router);
    this.apiEndPoint = `${environment.apiUrl}Account/Login`;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  /**
   * Enviar credenciales y guardar token
   * */
  postSesion$(credenciales) {
    return this.post(credenciales)
      .map(r => {
        const token = r.json();
        this.userStoreService.logIn({ user: credenciales.user }, token);
        this.router.navigate([this.returnUrl]);
      });
  }

  /**
   * Enviar credenciales y guardar token
   * */
  postUser$(credenciales) {
    return this.http
      .post(this.apiEndPoint, credenciales)
      .map(r => {
        const token = r.json();
        this.userStoreService.logIn({ user: credenciales.user }, token);
        this.router.navigate([this.returnUrl]);
        return token;
      });
  }

  /**
   * Obtener el usuario actual
   * */
  getProfile(): UserDataStorage {
    return this.userStoreService.getProfile();
  }

}
