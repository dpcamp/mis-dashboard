import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

import { ClarityModule } from 'clarity-angular';

import { InputTextModule, ButtonModule, DataTableModule, DialogModule, GrowlModule }  from 'primeng/primeng';
import { TextMaskModule } from 'angular2-text-mask';

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
import { PhoneSidebarComponent } from './phones/phone-sidebar/phone-sidebar.component';


import { ComputerService } from './shared/services/computer.service';
import { ComputersComponent } from './computers/computers.component';
import { ComputerListComponent } from './computers/computer-list/computer-list.component';
import { ComputerSingleComponent } from './computers/computer-single/computer-single.component';

import { FileSizePipe } from './shared/components/file-size.pipe'
import { ClipboardModule } from 'ngx-clipboard'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

@NgModule({
  declarations: [
    AppComponent,

    FileSizePipe,
    
    UsersComponent,
    UserListComponent,
    UserSingleComponent,
    UserEditComponent,
    UserCreateComponent,

    PhonesComponent,
    PhoneListComponent,
    PhoneSidebarComponent, 

    ComputersComponent,
    ComputerListComponent,
    ComputerSingleComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule.forRoot(),
    ClipboardModule,
    FormsModule,
    TextMaskModule,
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
    PhoneService, 
    ComputerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
