import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GlobalState } from '../../../global.state';

import { UserDataStorage } from '../../../_models/index';
import { UserStoreService } from '../../../_helpers/index';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss'],
})
export class BaPageTop {
  currentUser: UserDataStorage;
  isScrolled: boolean = false;
  isMenuCollapsed: boolean = false;
  payload: any;

  constructor(
    private _state: GlobalState,
    private userStoreService: UserStoreService,
    private router: Router,
    private route: ActivatedRoute,
) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this.currentUser = new UserDataStorage();

    this.payload = this.userStoreService.getProfile();

     if ( this.payload.token !== null ) {
        const accessToken = this.payload.token.access_token;
        const data = decodeURIComponent(atob(accessToken.split('.')[1]));
        this.currentUser = JSON.parse(data);
      } else {
        this.router.navigate(['/login']);
      }
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
}
