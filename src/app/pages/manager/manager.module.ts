import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';

// import specific directive
import { DataFilterClientPipe } from './client/list-client/data-filter.pipe';
import { DataFilterCasePipe } from './case/list-case/data-filter.pipe';
import { routing } from './manager.routing';
import { ManagerComponent } from './manager.component';
import { CreateClientComponent } from './client/create-client/create-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import {
  CreateClientServices,
  ListClientServices,
  CreateCaseService,
  ListPaymentService,
  ListCaseService,
  DeleteClientServices,
  CreatePaymentService,
  DeletePaymentServices,
  CreateAttorneyService,
  ListAttorneyService,
  DeleteCaseService,
  UpdateClientServices,
  AlertService,
} from '../../_services/index';
import { CreateCaseComponent } from './case/create-case/create-case.component';
import { CreatePaymentComponent } from './payment/create-payment/create-payment.component';
import { ListPaymentComponent } from './payment/list-payment/list-payment.component';
import { ListCaseComponent } from './case/list-case/list-case.component';
import { UpdateClientComponent } from './client/update-client/update-client.component';
import { AlertComponent } from './alert/alert.component';
import { HistoryCaseComponent } from './case/history-case/history-case.component';

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
    ManagerComponent,
    CreateClientComponent,
    DataFilterClientPipe,
    DataFilterCasePipe,
    ListClientComponent,
    CreateCaseComponent,
    CreatePaymentComponent,
    ListPaymentComponent,
    ListCaseComponent,
    UpdateClientComponent,
    AlertComponent,
    HistoryCaseComponent,
  ],
  providers: [
    CreateClientServices,
    ListClientServices,
    CreateCaseService,
    ListPaymentService,
    ListCaseService,
    DeleteClientServices,
    CreatePaymentService,
    DeletePaymentServices,
    CreateAttorneyService,
    ListAttorneyService,
    DeleteCaseService,
    UpdateClientServices,
    AlertService,
  ],
})
export class ManagerModule { }
