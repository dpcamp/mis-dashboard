import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app.routing';

import { ClarityModule } from '@clr/angular';

        
import {TableModule} from 'primeng/table';
import {DataViewModule} from 'primeng/dataview';
import {ToastModule} from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import {MessageService} from 'primeng/api';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';


import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent } from './app.component';

import { UserService } from './shared/services/user.service';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserSingleComponent } from './users/user-single/user-single.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserOnboardComponent } from './users/user-onboard/user-onboard.component';
import { UserOnboardStatusComponent } from './users/user-onboard-status/user-onboard-status.component';

import { PhoneService } from './shared/services/phone.service';
import { PhonesComponent } from './phones/phones.component';
import { PhoneListComponent } from './phones/phone-list/phone-list.component';
import { PhoneSidebarComponent } from './phones/phone-sidebar/phone-sidebar.component';

import {UsernameValidator} from './shared/validators/username'

import { VouchersComponent } from './vouchers/vouchers.component';

import { ComputerService } from './shared/services/computer.service';
import { ComputersComponent } from './computers/computers.component';
import { ComputerListComponent } from './computers/computer-list/computer-list.component';
import { ComputerSingleComponent } from './computers/computer-single/computer-single.component';

import { ReportService } from './shared/services/report.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SrReportsComponent } from './dashboard/sr-reports/sr-reports.component';

import { AuthService } from './shared/services/auth.service';
import { ValidationService } from './shared/services/validation.service';
import { WinAuthInterceptor } from './shared/interceptors/winauth.interceptor';

import { FileSizePipe } from './shared/components/file-size.pipe'
import { ClipboardModule } from 'ngx-clipboard'






import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent,

    FileSizePipe,

    UsersComponent,
    UserListComponent,
    UserSingleComponent,
    UserEditComponent,
    UserCreateComponent,
    UserOnboardComponent,
    UserOnboardStatusComponent,

    PhonesComponent,
    PhoneListComponent,
    PhoneSidebarComponent,

    ComputersComponent,
    ComputerListComponent,
    ComputerSingleComponent,
    VouchersComponent,

    DashboardComponent,
    SrReportsComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    ClipboardModule,
    ReactiveFormsModule,

    FormsModule,
    TextMaskModule,
    DataViewModule,
    TableModule,
    ToastModule,
    ChartModule,

    ApolloModule,
    HttpLinkModule,
    HttpClientModule,

    HttpModule,
    HttpClientModule,


    routing,

    GraphQLModule
  ],

  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WinAuthInterceptor,
      multi: true
    },
    AuthService,
    UserService,
    PhoneService,
    ComputerService,
    ReportService,
    ValidationService,
    MessageService,
    UsernameValidator
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
