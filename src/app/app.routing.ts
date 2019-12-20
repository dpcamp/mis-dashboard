import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserSingleComponent } from './users/user-single/user-single.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';

import { UserCreateComponent } from './users/user-create/user-create.component';

import { PhonesComponent } from './phones/phones.component';
import { PhoneListComponent } from './phones/phone-list/phone-list.component';

import { ComputersComponent } from './computers/computers.component';
import { ComputerListComponent } from './computers/computer-list/computer-list.component';
import { ComputerSingleComponent } from './computers/computer-single/computer-single.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SrReportsComponent } from './dashboard/sr-reports/sr-reports.component';

// import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UserListComponent
      },
      {
        path: 'sam/:user_name',
        component: UserSingleComponent
      },
      {
        path: 'ext/:ext',
        component: UserSingleComponent
      },
      {
        path: 'create',
        component: UserCreateComponent
      }
    ]
  },
  {
    path: 'phones',
    component: PhonesComponent,
    children: [
      {
        path: '',
        component: PhoneListComponent
      }
    ]
  },
  {
    path: 'computers',
    component: ComputersComponent,
    children: [
      {
        path: '',
        component: ComputerListComponent
      },
      {
        path: ':computer_id',
        component: ComputerSingleComponent
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'SR',
        component: SrReportsComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
