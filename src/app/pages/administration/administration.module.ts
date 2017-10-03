import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { routing } from './administration.routing';
import { AdministrationComponent } from './administration.component';
import { DataFilterUserPipe } from './user/list-user/data-filter.pipe';
import { ListUserComponent } from './user/list-user/list-user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { AlertComponent } from './alert/alert.component';
import {
  CreateUserServices,
  ListUserServices,
  DeleteUserService,
  UpdateUserService,
  ListAttorneyService,
  CreateAttorneyService,
  UpdateAttorneyService,
  DeleteAttorneyService,
  AlertService,
} from '../../_services/index';
import { CreateAttorneyComponent } from './attorney/create-attorney/create-attorney.component';
import { ListAttorneyComponent } from './attorney/list-attorney/list-attorney.component';
import { DataFilterAttorneyPipe } from './attorney/list-attorney/data-filter.pipe';
import { UpdateAttorneyComponent } from './attorney/update-attorney/update-attorney.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    NgaModule,
    NgbRatingModule,
    NgbModalModule,
    ReactiveFormsModule,
    DataTableModule,
  ],
  declarations: [
    AdministrationComponent,
    ListUserComponent,
    CreateUserComponent,
    DataFilterUserPipe,
    UpdateUserComponent,
    AlertComponent,
    CreateAttorneyComponent,
    ListAttorneyComponent,
    DataFilterAttorneyPipe,
    UpdateAttorneyComponent,
  ],
  providers: [
    ListUserServices,
    DeleteUserService,
    UpdateUserService,
    ListAttorneyService,
    CreateAttorneyService,
    UpdateAttorneyService,
    DeleteAttorneyService,
    AlertService,
  ],
})
export class AdministrationModule { }
