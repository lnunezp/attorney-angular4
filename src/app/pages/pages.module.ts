import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';

import { PagesComponent } from './pages.component';
import { UserStoreService } from '../_helpers/index';
import { AuthGuardService } from '../_services/index';
import { ManagerModule } from './manager/manager.module';
import { AdministrationModule } from './administration/administration.module';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    NgaModule,
    routing,
  ],
  declarations: [
    PagesComponent,
  ],
  providers: [
    UserStoreService,
    AuthGuardService,
  ],
})
export class PagesModule {
}
