import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MembersPage } from '../pages/members/members';
import { TimerPage } from '../pages/timer/timer';
import { ModalMemberPage } from '../pages/modal-member/modal-member';
import { LoadPage } from '../pages/load/load';
import { FinishPage } from '../pages/finish/finish';

import { HttpClientModule } from '@angular/common/http';

import { MeetingProvider } from '../providers/meeting/meeting';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TimerPage,
    MembersPage,
    ModalMemberPage,
    LoadPage,
    FinishPage
    ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TimerPage,
    MembersPage,
    ModalMemberPage,
    LoadPage,
    FinishPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MeetingProvider
    ]
})
export class AppModule {}
