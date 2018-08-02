import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MeetingProvider } from '../../providers/meeting/meeting';
import { FinishPage } from '../finish/finish';

import { Platform } from 'ionic-angular';
import { Navbar } from 'ionic-angular';
import { ViewChild } from '@angular/core';

import { AlertController } from 'ionic-angular';


/**
 * Generated class for the TimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html',
})

export class TimerPage {

  @ViewChild(Navbar) navBar: Navbar;


  public unregisterBackButtonAction: any;

  public money = 0.0;
  public moneyShow = 0;
  public isCountdown = false;

  public totalCost = 0.0;

  public time = 0;
  public runTimer = true;

  public clockTime: any;


  constructor(
    public navCtrl: NavController,
    public meetingProvider: MeetingProvider,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public platform: Platform
  ) {


    if (this.navParams.get('money') > 0) {
      console.log("This is a countdown, we found money!");
      this.isCountdown = true;
      this.money = this.navParams.get('money');
      this.moneyShow = this.money;
    }

    this.averageCost();

    this.clockTime = this.getSecondsAsDigitalClock(this.time);



  }

  ionViewDidEnter() {

    if (this.isCountdown) {
      this.startCountdown();
    }
    else {
      this.startTimer();
    }

    this.navBar.backButtonClick = (e: UIEvent) => {

      this.goBackButton();

    }

    this.initializeBackButtonCustomHandler();


  }

  ionViewWillLeave() {

    this.unregisterBackButtonAction && this.unregisterBackButtonAction();

  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }


  timerTick() {
    setTimeout(() => {

      if (!this.runTimer) { return; }

      this.time++;
      this.clockTime = this.getSecondsAsDigitalClock(this.time);

      this.timerTick();

    }, 1000);
  }

  averageCost() {

    this.totalCost = 0;
    let memberCost = 0.0;

    for (let member of this.meetingProvider.members) {

      memberCost = 0;

      switch (member.costScheme) {
        case "h": {
          memberCost = member.cost;
          break;
        }
        case "d": {
          memberCost = member.cost/8.0;
          break;
        }
        case "m": {
          memberCost = member.cost/20.0/8.0;
          break;
        }
        case "y": {
          memberCost = member.cost/230/8.0;
          break;
        }
        default: {
          memberCost = 0;
          break;
        }
      }

      this.totalCost = this.totalCost + member.number * memberCost;
    }

    this.totalCost = this.totalCost / 60 / 60;

  }

  moneyIncrease() {

    setTimeout(() => {

      if (!this.runTimer) { return; }

      this.time++;
      this.clockTime = this.getSecondsAsDigitalClock(this.time);

      this.money = this.totalCost * this.time;
      this.moneyShow = Math.floor(this.money);

      this.moneyIncrease();

    }, 1000);

  }

  moneyDecrease() {

    setTimeout(() => {

      if (!this.runTimer) { return; }

      this.time++;
      this.clockTime = this.getSecondsAsDigitalClock(this.time);

      this.moneyShow = Math.floor(this.money - this.totalCost * this.time);

      this.moneyDecrease();

    }, 1000);

  }

  startTimer() {

    this.moneyIncrease();

  }

  startCountdown() {

    this.moneyDecrease();

  }

  gotoFinish() {

    let moneymeeting = 0;

    if (this.isCountdown) {
      moneymeeting = this.money - this.moneyShow;
    }
    else {
      moneymeeting = this.moneyShow;
    }

    let data = {
      "meetingTime": this.clockTime,
      "isCountDown": this.isCountdown,
      "meetingCost": moneymeeting,
      "money": this.money
    };
    this.navCtrl.push(FinishPage, data);
  }

 
  goBackButton() {
    
    const confirm = this.alertCtrl.create({
      title: 'Confirm meeting exit',
      message: 'Are you sure you want to go back?\nThis will reset the timer...',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Exit meeting',
          handler: () => {
            console.log('Agree clicked');
            this.unregisterBackButtonAction && this.unregisterBackButtonAction();
            this.navCtrl.pop();
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




