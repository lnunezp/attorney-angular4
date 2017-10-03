import { DataStoreService } from './../index';
import { Injectable } from '@angular/core';
import { UserDataStorage } from '../../_models/index';

@Injectable()
/**
 * Servicio especializado en guardar el estado del usuario
 * */
export class UserStoreService extends DataStoreService {

  constructor() {
    super('currentUser', {
      isLogged: false,
      token: '',
      userName: '',
      password: '',
    });
  }

  logIn(userName, token) {
    super.setData({ userName, token, isLogged: true });
  }

  logOut() {
    super.removeData();
  }

  getProfile(): UserDataStorage {
    // To Do: refresh form API
    return super.getData();
  }
}
