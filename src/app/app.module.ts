import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

import { ClarityModule } from 'clarity-angular';

import { InputTextModule, ButtonModule, DataTableModule, DialogModule, GrowlModule }  from 'primeng/primeng';

import { AppComponent } from './app.component';

import { UserService } from './shared/services/user.service';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserSingleComponent } from './users/user-single/user-single.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserCreateComponent } from './users/user-create/user-create.component';

import { PhoneService } from './shared/services/phone.service';
import { PhonesComponent } from './phones/phones.component';
import { PhoneListComponent } from './phones/phone-list/phone-list.component';
import { PhoneSingleComponent } from './phones/phone-single/phone-single.component';
import { PhoneCreateComponent } from './phones/phone-create/phone-create.component';
import { PhoneEditComponent } from './phones/phone-edit/phone-edit.component';
import { PhoneSidebarComponent } from './phones/phone-sidebar/phone-sidebar.component';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

@NgModule({
  declarations: [
    AppComponent,
    
    UsersComponent,
    UserListComponent,
    UserSingleComponent,
    UserEditComponent,
    UserCreateComponent,

    PhonesComponent,
    PhoneListComponent,
    PhoneSingleComponent,
    PhoneCreateComponent,
    PhoneEditComponent,
    PhoneSidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule.forRoot(),
    FormsModule,
    DataTableModule,
    GrowlModule,
    HttpModule,
    InputTextModule, 
    DialogModule,
    ButtonModule,
    routing
  ],
  
  providers: [
    UserService,
    PhoneService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
