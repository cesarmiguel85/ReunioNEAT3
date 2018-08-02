import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MembersPage } from '../members/members';
import { LoadPage } from '../load/load';

import { MeetingProvider } from '../../providers/meeting/meeting';

import { AlertController } from 'ionic-angular';

import { Platform } from 'ionic-angular';

import { App } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = [];
  public reorderIsEnabled = false;
  public subtitle_array = [
    "Unveiling the cost of non decision.",
    "Finally giving you reasons not to attend meetings.",
    "Healing the compulsive meeting disorder.",
    "Raising awareness on over-meetings.",
    "Helping you prove that fewer people and lower time means more productive."
  ];

  public subtitle: any;

  public unregisterBackButtonAction: any;


  constructor(
    public navCtrl: NavController,
    public meetingProvider: MeetingProvider,
    public alertCtrl: AlertController,
    public platform: Platform,
    public app:App

  ) {

    this.meetingProvider.restoreMeetings();
    this.subtitle = this.subtitle_array[Math.floor(Math.random() * this.subtitle_array.length)];

  }


  gotoMembers() {
    this.meetingProvider.members = [];
    this.navCtrl.push(MembersPage);
  }
  gotoLoad() {
    this.navCtrl.push(LoadPage);
  }

  aboutUs() {
    let alert = this.alertCtrl.create({
      title: 'About us',
      subTitle: '<p>Two colleagues/friends with an idea, building a prototype to try it out!</p> <p>Haven\'t you ever felt drowned by so many meetings? It\'s like an obsession in some companies!\n\n</p><p>What if you could have an estimation of the human cost of all these people spending all this time sitting?</p><p>Welcome, REUNIONEAT!</p><p>Idea/Dev: Cesar Miguel & Bastien Januel<br>Logo: Yazan Alkhayer</p>',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  ionViewDidEnter() {
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  goBackButton() {
    let _this = this;
    const confirm = this.alertCtrl.create({
      title: 'Confirm app exit',
      message: 'Are you sure you want to exit?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Exit',
          handler: () => {
            _this.platform.exitApp();
            _this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();


  }

  initializeBackButtonCustomHandler(): void {
    let _this=this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      _this.goBackButton();
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }


}
