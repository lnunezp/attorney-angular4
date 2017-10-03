import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { CreateAttorneyComponent } from './attorney/create-attorney/create-attorney.component';
import { ListAttorneyComponent } from './attorney/list-attorney/list-attorney.component';
import { UpdateAttorneyComponent } from './attorney/update-attorney/update-attorney.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      { path: 'listUser', component: ListUserComponent },
      { path: 'createUser', component: CreateUserComponent },
      { path: 'updateUser/:token', component: UpdateUserComponent },
      { path: 'createAttorney', component: CreateAttorneyComponent },
      { path: 'listAttorney', component: ListAttorneyComponent },
      { path: 'updateAttorney/:token', component: UpdateAttorneyComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
