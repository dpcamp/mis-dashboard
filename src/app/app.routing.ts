import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserSingleComponent } from './users/user-single/user-single.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserCreateComponent } from './users/user-create/user-create.component';

import { PhonesComponent } from './phones/phones.component';
import { PhoneListComponent } from './phones/phone-list/phone-list.component';

import { ComputersComponent } from "./computers/computers.component";
import { ComputerListComponent } from "./computers/computer-list/computer-list.component";
import { ComputerSingleComponent } from "./computers/computer-single/computer-single.component";


//import { LoginComponent } from './login/login.component';

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
      }
/*       {
        path: 'create',
        component: UserCreateComponent
      },
      {
        path: ':id',
        component: UserSingleComponent
      },
      {
        path: ':id/edit',
        component: UserEditComponent
      } */
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
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);