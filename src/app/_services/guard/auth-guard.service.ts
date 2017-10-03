import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { UserStoreService } from '../../_helpers/index';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private userStoreService: UserStoreService,
    private router: Router,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const datos = this.userStoreService.getProfile();
    if ( datos.token['expires_in'] < Date.now() / 1000 ) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
