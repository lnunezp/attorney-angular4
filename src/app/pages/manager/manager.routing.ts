import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { CreateClientComponent } from './client/create-client/create-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { CreateCaseComponent } from './case/create-case/create-case.component';
import { CreatePaymentComponent } from './payment/create-payment/create-payment.component';
import { ListCaseComponent } from './case/list-case/list-case.component';
import { UpdateClientComponent } from './client/update-client/update-client.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      { path: 'createClient', component: CreateClientComponent },
      { path: 'listClient', component: ListClientComponent },
      { path: 'createCase/:token', component: CreateCaseComponent },
      { path: 'createPayment/:token', component: CreatePaymentComponent },
      { path: 'listCase/:token', component: ListCaseComponent },
      { path: 'updateClient/:token', component: UpdateClientComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
